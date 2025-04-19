const handleLike = async () => {
  if (!isLiking) {
    try {
      setIsLiking(true);
      await toggleLike(song);
    } finally {
      setIsLiking(false);
    }
  }
}; 