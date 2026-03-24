import axios from 'axios'
import { Heart } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import LikedList from './components/LikedList'
import QuoteCard from './components/QuoteCard'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [likedQuotes, setLikedQuotes] = useLocalStorage('likedQuotes', [])

  const fetchQuote = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await axios.get('https://api.quotable.io/random')
      const data = response.data

      setQuote({
        id: data._id,
        content: data.content,
        author: data.author,
      })
    } catch {
      setError('Could not fetch a quote right now. Please try again in a moment.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  const isLiked = useMemo(() => {
    if (!quote) {
      return false
    }

    return likedQuotes.some((likedQuote) => likedQuote.id === quote.id)
  }, [likedQuotes, quote])

  const toggleLike = () => {
    if (!quote) {
      return
    }

    // Toggle interaction: remove when already liked, otherwise add to liked quotes.
    setLikedQuotes((previousLikes) => {
      const alreadyLiked = previousLikes.some((likedQuote) => likedQuote.id === quote.id)

      if (alreadyLiked) {
        return previousLikes.filter((likedQuote) => likedQuote.id !== quote.id)
      }

      return [...previousLikes, quote]
    })
  }

  const removeLike = (id) => {
    setLikedQuotes((previousLikes) => previousLikes.filter((likedQuote) => likedQuote.id !== id))
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.45),transparent_35%),radial-gradient(circle_at_90%_10%,rgba(56,189,248,0.22),transparent_35%),radial-gradient(circle_at_70%_80%,rgba(251,113,133,0.24),transparent_30%),linear-gradient(120deg,#dbeafe_0%,#f0f9ff_40%,#fff1f2_100%)] px-4 py-8 sm:px-6 md:py-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 rounded-2xl border border-white/40 bg-white/60 px-4 py-4 shadow-lg shadow-slate-900/10 backdrop-blur-md sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Daily Motivation Dashboard</p>
              <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">Fuel your focus with fresh quotes</h1>
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700">
              <Heart className="h-4 w-4 fill-current" />
              Total Liked: {likedQuotes.length}
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <QuoteCard
            quote={quote}
            loading={loading}
            isLiked={isLiked}
            onNewQuote={fetchQuote}
            onToggleLike={toggleLike}
            error={error}
          />
          <LikedList likedQuotes={likedQuotes} onDeleteLike={removeLike} />
        </div>
      </div>
    </main>
  )
}

export default App
