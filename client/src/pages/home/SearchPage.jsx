export default function SearchPage() {
  return (
    <div className="p-4">
      <h1 className="h3 mb-4">Search</h1>
      <div className="mb-4">
        <input
          type="text"
          className="form-control bg-dark text-white border-0"
          placeholder="Search for artists, songs, or podcasts"
        />
      </div>
      <div className="text-center text-secondary mt-5">
        <p>Search for your favorite music</p>
      </div>
    </div>
  )
}
