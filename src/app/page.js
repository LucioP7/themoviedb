import Carrucel from './components/Carrucel/Carrucel'
import MediaGrid from './components/MediaGrid/MediaGrid'
import { getTrending } from './utils/tmdbApi'
import { category } from './utils/tmdbApi'

export default async function Home() {
  const trendingData = await getTrending(category.tv)

  return (
    <div>
      <Carrucel items={trendingData.results}/>
      <h1 className="text-3xl font-bold mb-6">Trending This Week</h1>
      <MediaGrid items={trendingData.results} />
    </div>
  )
}


