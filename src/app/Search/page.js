'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import MediaGrid from '../../components/MediaGrid'

async function searchMedia(query, page = 1) {
  const res = await fetch(`/api/tmdb/search/multi?query=${encodeURIComponent(query)}&page=${page}`)
  if (!res.ok) {
    throw new Error('Failed to search media')
  }
  return res.json()
}

export default function Search() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    if (query) {
      searchMedia(query, page).then((data) => {
        setResults(data.results)
        setTotalPages(data.total_pages)
      })
    }
  }, [query, page])

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>
      {results.length > 0 ? (
        <>
          <MediaGrid items={results} />
          {page < totalPages && (
            <div className="mt-8 text-center">
              <button
                onClick={handleLoadMore}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  )
}