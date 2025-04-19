const express = require('express');
const router = express.Router();
const verifyRefreshToken = require('../middleware/verifyToken');
const Playlist = require('../models/playlist');
const User = require('../models/user');
const Song = require('../models/song');

// Get user's playlists
router.get('/my-playlists', verifyRefreshToken, async (req, res) => {
  try {
    console.log('User in my-playlists route:', req.user);
    const playlists = await Playlist.find({ user: req.user.id })
      .populate('songs')
      .sort({ createdAt: -1 });
    res.json(playlists);
  } catch (err) {
    console.error('Error fetching playlists:', err);
    res.status(500).json({ error: 'Failed to fetch playlists' });
  }
});

// Create new playlist
router.post('/create', verifyRefreshToken, async (req, res) => {
  try {
    const { name, description, isPublic } = req.body;
    const playlist = await Playlist.create({
      name,
      description,
      user: req.user.id,
      isPublic
    });

    // Add playlist to user's playlists
    await User.findByIdAndUpdate(req.user.id, {
      $push: { playlists: playlist._id }
    });

    res.status(201).json(playlist);
  } catch (err) {
    console.error('Error creating playlist:', err);
    res.status(500).json({ error: 'Failed to create playlist' });
  }
});

// Add song to playlist
router.post('/:playlistId/add-song', verifyRefreshToken, async (req, res) => {
  try {
    const { songId } = req.body;
    const playlist = await Playlist.findById(req.params.playlistId);

    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    if (playlist.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }

    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await playlist.save();
    }

    const populatedPlaylist = await playlist.populate('songs');
    res.json(populatedPlaylist);
  } catch (err) {
    console.error('Error adding song to playlist:', err);
    res.status(500).json({ error: 'Failed to add song to playlist' });
  }
});

// Remove song from playlist
router.delete('/:playlistId/remove-song/:songId', verifyRefreshToken, async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.playlistId);

    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    if (playlist.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    playlist.songs = playlist.songs.filter(songId => songId.toString() !== req.params.songId);
    await playlist.save();

    const populatedPlaylist = await playlist.populate('songs');
    res.json(populatedPlaylist);
  } catch (err) {
    console.error('Error removing song from playlist:', err);
    res.status(500).json({ error: 'Failed to remove song from playlist' });
  }
});

// Like/unlike a song
router.post('/toggle-like/:songId', verifyRefreshToken, async (req, res) => {
  try {
    const songId = req.params.songId;
    console.log('Toggling like for song:', songId);
    
    // First check if the song exists
    const song = await Song.findById(songId);
    if (!song) {
      console.log('Song not found:', songId);
      return res.status(404).json({ error: 'Song not found' });
    }

    // Find or create the "Likes" playlist for the user
    let likesPlaylist = await Playlist.findOne({ 
      user: req.user.id, 
      name: 'Likes' 
    });

    if (!likesPlaylist) {
      console.log('Creating new Likes playlist for user:', req.user.id);
      // Create the Likes playlist if it doesn't exist
      likesPlaylist = await Playlist.create({
        name: 'Likes',
        description: 'Your liked songs',
        user: req.user.id,
        isPublic: false
      });

      // Add the playlist to user's playlists
      await User.findByIdAndUpdate(req.user.id, {
        $push: { playlists: likesPlaylist._id }
      });
    }

 
    const songIndex = likesPlaylist.songs.findIndex(id => id.toString() === songId);
    console.log('Song index in playlist:', songIndex);
    
    if (songIndex === -1) {
      
      likesPlaylist.songs.push(songId);
      console.log('Adding song to playlist');
    } else {
      
      likesPlaylist.songs.splice(songIndex, 1);
      console.log('Removing song from playlist');
    }

    await likesPlaylist.save();
    console.log('Playlist saved');
    
    
    const updatedPlaylist = await Playlist.findById(likesPlaylist._id).populate('songs');
    console.log('Updated playlist songs count:', updatedPlaylist.songs.length);
    
    res.json(updatedPlaylist.songs);
  } catch (err) {
    console.error('Error toggling like:', err);
    res.status(500).json({ error: 'Failed to toggle like' });
  }
});


router.get('/liked-songs', verifyRefreshToken, async (req, res) => {
  try {
    console.log('Fetching liked songs for user:', req.user.id);
   
    const likesPlaylist = await Playlist.findOne({ 
      user: req.user.id, 
      name: 'Likes' 
    }).populate('songs');

    if (!likesPlaylist) {
      console.log('No Likes playlist found for user:', req.user.id);
      return res.json([]); 
    }

    console.log('Found Likes playlist with songs:', likesPlaylist.songs.length);
    res.json(likesPlaylist.songs);
  } catch (err) {
    console.error('Error fetching liked songs:', err);
    res.status(500).json({ error: 'Failed to fetch liked songs' });
  }
});


router.post('/like-song/:songId', verifyRefreshToken, async (req, res) => {
  try {
    console.log('User in like-song route:', req.user);
    
    if (!req.user || !req.user.id) {
      console.log('Missing user ID in request', req.user);
      return res.status(401).json({ error: 'User not authenticated' });
    }
    
    const songId = req.params.songId;
    console.log(`Adding song ${songId} to liked songs for user ${req.user.id}`);
    
    
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }

   
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

  
    const likedSongIds = user.likedSongs.map(id => id.toString());
    const isAlreadyLiked = likedSongIds.includes(songId);
    
    if (isAlreadyLiked) {
      
      console.log(`Removing song ${songId} from user's liked songs`);
      
      await User.findByIdAndUpdate(
        req.user.id, 
        { $pull: { likedSongs: songId } },
        { new: true }
      );
    } else {
      
      console.log(`Adding song ${songId} to user's liked songs`);
      
      await User.findByIdAndUpdate(
        req.user.id, 
        { $addToSet: { likedSongs: songId } },
        { new: true }
      );
    }

    
    const updatedUser = await User.findById(req.user.id).populate('likedSongs');
    console.log(`Updated liked songs: ${updatedUser.likedSongs.length} songs`);
    
    res.json(updatedUser.likedSongs);
  } catch (err) {
    console.error('Error toggling song like:', err);
    res.status(500).json({ error: 'Failed to toggle song like' });
  }
});

router.get('/liked-songs-direct', verifyRefreshToken, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      console.log('Missing user ID in request', req.user);
      return res.status(401).json({ error: 'User not authenticated' });
    }
    
    console.log(`Fetching liked songs for user ${req.user.id}`);
    
    try {
      
      const user = await User.findById(req.user.id)
        .populate({
          path: 'likedSongs',
          model: 'Song'
        });
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      console.log(`Found ${user.likedSongs ? user.likedSongs.length : 0} liked songs for user`);
      res.json(user.likedSongs || []);
    } catch (error) {
      console.error('Error populating liked songs:', error);
      
      
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
     
      const likedSongs = [];
      for (const songId of user.likedSongs) {
        try {
          const song = await Song.findById(songId);
          if (song) {
            likedSongs.push(song);
          }
        } catch (songError) {
          console.error(`Error fetching song ${songId}:`, songError);
        }
      }
      
      console.log(`Fallback: Found ${likedSongs.length} liked songs for user`);
      res.json(likedSongs);
    }
  } catch (err) {
    console.error('Error fetching liked songs:', err);
    res.status(500).json({ error: 'Failed to fetch liked songs' });
  }
});


router.delete('/delete-account', verifyRefreshToken, async (req, res) => {
  try {
    const userId = req.user.id;

    
    await Playlist.deleteMany({ user: userId });

   
    await User.findByIdAndDelete(userId);

    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    console.error('Error deleting account:', err);
    res.status(500).json({ error: 'Failed to delete account' });
  }
});

module.exports = router; 