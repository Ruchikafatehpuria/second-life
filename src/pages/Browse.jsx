import { Link, useSearchParams } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader.jsx'
import SearchBar from '../components/ui/SearchBar.jsx'
import FilterBar from '../components/ui/FilterBar.jsx'
import ItemCard from '../components/ui/ItemCard.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import SampleDataNotice from '../components/ui/SampleDataNotice.jsx'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import { filterItems } from '../lib/search.js'
import { SAMPLE_ITEMS } from '../data/sampleData.js'

export default function Browse() {
  useDocumentTitle('Browse items')

  // The filters live in the URL (?q=desk&category=furniture&condition=good).
  // That means filtered results can be bookmarked, shared, and survive a refresh,
  // and the Home page can link straight to a filtered view.
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') ?? ''
  const category = searchParams.get('category') ?? ''
  const condition = searchParams.get('condition') ?? ''

  function updateParam(name, value) {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(name, value)
    else next.delete(name)
    setSearchParams(next)
  }

  function clearAll() {
    setSearchParams({})
  }

  const results = filterItems(SAMPLE_ITEMS, { q, category, condition })
  const hasActiveFilters = Boolean(q || category || condition)

  return (
    <>
      <PageHeader
        title="Browse items"
        subtitle="Discover things to reuse, repair or upcycle."
      />
      <div className="container section browse">
        {/* key={q} resets the search box text when q changes (e.g. after "Clear filters") */}
        <SearchBar key={q} initialValue={q} onSearch={(text) => updateParam('q', text)} />
        <FilterBar
          category={category}
          condition={condition}
          onChange={updateParam}
          onClear={clearAll}
          hasActiveFilters={hasActiveFilters}
        />

        <SampleDataNotice />

        <p className="results-count" aria-live="polite">
          {results.length} {results.length === 1 ? 'item' : 'items'} found
          {q && (
            <>
              {' '}
              for “<strong>{q}</strong>”
            </>
          )}
        </p>

        {results.length > 0 ? (
          <div className="grid grid-items">
            {results.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="🔎"
            title="No items match your search"
            message="Try a different word, choose another category, or clear the filters."
          >
            <button type="button" className="btn btn-primary" onClick={clearAll}>
              Clear filters
            </button>
            <Link to="/post" className="btn btn-secondary">
              Post an item
            </Link>
          </EmptyState>
        )}
      </div>
    </>
  )
}
