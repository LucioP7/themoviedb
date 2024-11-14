import Image from 'next/image'

async function getMovieDetails(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tmdb/movie/${id}?append_to_response=videos,credits`)
  if (!res.ok) {
    throw new Error('Failed to fetch movie details')
  }
  return res.json()
}

export default async function MovieDetails({ params }) {
  const movie = await getMovieDetails(params.id)

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/3">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={500}
          height={750}
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="md:w-2/3">
        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
        <p className="text-gray-600 mb-4">{movie.overview}</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Release Date</h2>
            <p>{movie.release_date}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Rating</h2>
            <p>{movie.vote_average.toFixed(1)} / 10</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Genres</h2>
            <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Runtime</h2>
            <p>{movie.runtime} minutes</p>
          </div>
        </div>
        {movie.videos.results.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Trailer</h2>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        )}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Cast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {movie.credits.cast.slice(0, 8).map((actor) => (
              <div key={actor.id} className="text-center">
                <Image
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  width={100}
                  height={150}
                  className="rounded-lg mx-auto"
                />
                <p className="mt-2 font-semibold">{actor.name}</p>
                <p className="text-sm text-gray-600">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }) {
  const movie = await getMovieDetails(params.id)
  return {
    title:  `${movie.title} | MovieDB Explorer`,
    description: movie.overview,
  }
}