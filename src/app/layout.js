import './globals.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'


export const metadata = {
  title: 'MovieDB Explorer',
  description: 'Explore movies and TV shows with MovieDB Explorer',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}