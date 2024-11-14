import Image from 'next/image'
import Link from 'next/link'

export default function MediaCard({ item }) {
  const { id, title, name, poster_path, vote_average, media_type } = item
  const linkHref = `/${media_type}/${id}`

  return (
    <Link href={linkHref} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-64">
        <Image
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title || name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 truncate">{title || name}</h2>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">{media_type.toUpperCase()}</span>
          <span className="bg-yellow-400 text-yellow-900 py-1 px-2 rounded-full text-xs font-semibold">
            {vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  )
}