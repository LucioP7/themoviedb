'use client'

import Link from 'next/link'
import { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between flex-wrap">
        <Link href="/" className="flex items-center flex-shrink-0 mr-6">
          <span className="font-semibold text-xl tracking-tight">YourMovie</span>
        </Link>
        <div className="block lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white"
          >
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? '' : 'hidden'}`}>
          <div className="text-sm lg:flex-grow">
            <Link href="/movies" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
              Movies
            </Link>
            <Link href="/tv" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
              TV Shows
            </Link>
            <Link href="/search" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white">
              Search
            </Link>
          </div>
          <div className="mt-4 lg:mt-0">
            <SearchBar />
          </div>
        </div>
      </nav>
    </header>
  )
}