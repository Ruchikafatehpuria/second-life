import { CATEGORIES, CONDITIONS } from '../../lib/constants.js'

// Category and condition dropdowns for the Browse page.
// onChange(name, value) is called whenever a dropdown changes.
export default function FilterBar({ category, condition, onChange, onClear, hasActiveFilters }) {
  return (
    <div className="filter-bar" aria-label="Filters" role="group">
      <div className="field">
        <label htmlFor="filter-category">Category</label>
        <select
          id="filter-category"
          className="select"
          value={category}
          onChange={(event) => onChange('category', event.target.value)}
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="filter-condition">Condition</label>
        <select
          id="filter-condition"
          className="select"
          value={condition}
          onChange={(event) => onChange('condition', event.target.value)}
        >
          <option value="">Any condition</option>
          {CONDITIONS.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        className="btn btn-ghost filter-clear"
        onClick={onClear}
        disabled={!hasActiveFilters}
      >
        Clear filters
      </button>
    </div>
  )
}
