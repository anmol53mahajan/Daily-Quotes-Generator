import { Search, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'

function LikedList({ likedQuotes, onDeleteLike }) {
  const [searchAuthor, setSearchAuthor] = useState('')

  const filteredQuotes = useMemo(() => {
    const query = searchAuthor.trim().toLowerCase()
    if (!query) {
      return likedQuotes
    }

    return likedQuotes.filter((quote) => quote.author.toLowerCase().includes(query))
  }, [likedQuotes, searchAuthor])

  return (
    <section className="rounded-3xl border border-white/40 bg-white/55 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-8">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-slate-800">Liked Quotes</h2>
        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
          {filteredQuotes.length}
        </span>
      </div>

      <label className="mb-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-3 py-2">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchAuthor}
          onChange={(event) => setSearchAuthor(event.target.value)}
          placeholder="Filter by author"
          className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />
      </label>

      {likedQuotes.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white/60 px-4 py-6 text-center text-sm text-slate-500">
          No liked quotes yet.
        </p>
      ) : filteredQuotes.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white/60 px-4 py-6 text-center text-sm text-slate-500">
          No authors match your search.
        </p>
      ) : (
        <ul className="space-y-3">
          {filteredQuotes.map((quote) => (
            <li key={quote.id} className="rounded-2xl border border-slate-200 bg-white/80 p-4">
              <p className="text-sm leading-relaxed text-slate-700">{quote.content}</p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{quote.author}</p>
                <button
                  type="button"
                  onClick={() => onDeleteLike(quote.id)}
                  className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default LikedList
