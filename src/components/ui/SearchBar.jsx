import { useState } from 'react'

// A search box. When submitted, it calls onSearch(text).
// The parent page decides what to do with the text (e.g. go to /browse?q=text).
export default function SearchBar({
  initialValue = '',
  onSearch,
  placeholder = 'Search for chairs, laptops, books…',
  size = 'normal',
}) {
  const [value, setValue] = useState(initialValue)

  function handleSubmit(event) {
    event.preventDefault() // stop the browser from reloading the page
    onSearch(value.trim())
  }

  return (
    <form
      role="search"
      className={size === 'large' ? 'search-bar search-bar-large' : 'search-bar'}
      onSubmit={handleSubmit}
    >
      <label htmlFor="search-input" className="visually-hidden">
        Search items
      </label>
      <input
        id="search-input"
        type="search"
        className="input"
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        maxLength={100}
      />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  )
}
