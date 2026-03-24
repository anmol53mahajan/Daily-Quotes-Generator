import { Heart, RefreshCw, Quote } from 'lucide-react'

function QuoteCard({ quote, loading, isLiked, onNewQuote, onToggleLike, error }) {
  return (
    <section className="rounded-3xl border border-white/40 bg-white/55 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-8">
      <div className="mb-6 flex items-center gap-2 text-slate-500">
        <Quote className="h-5 w-5" />
        <span className="text-sm font-semibold uppercase tracking-[0.15em]">Daily Quote</span>
      </div>

      {loading ? (
        <div className="space-y-3 animate-pulse">
          <div className="h-4 w-full rounded bg-slate-200/80" />
          <div className="h-4 w-11/12 rounded bg-slate-200/80" />
          <div className="h-4 w-8/12 rounded bg-slate-200/80" />
          <p className="pt-3 text-sm font-medium text-slate-500">Loading...</p>
        </div>
      ) : (
        <>
          <blockquote className="text-balance text-xl font-medium leading-relaxed text-slate-800 sm:text-2xl">
            {quote?.content || 'Click "New Quote" to get inspired.'}
          </blockquote>
          <p className="mt-4 text-right text-sm font-semibold uppercase tracking-widest text-slate-500">
            {quote?.author ? `- ${quote.author}` : 'Unknown Author'}
          </p>
        </>
      )}

      {error && (
        <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </p>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onNewQuote}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-500"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          New Quote
        </button>
        <button
          type="button"
          onClick={onToggleLike}
          disabled={loading || !quote}
          className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed ${
            isLiked
              ? 'border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100'
              : 'border-slate-300 bg-white/80 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          {isLiked ? 'Liked' : 'Like'}
        </button>
      </div>
    </section>
  )
}

export default QuoteCard
