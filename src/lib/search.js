// Filters a list of items by a search word, a category and a condition.
// Any filter left empty ('') is ignored.
// In Stage 4 the same filters will be applied by the database query instead.
export function filterItems(items, { q = '', category = '', condition = '' }) {
  const term = q.trim().toLowerCase()

  return items.filter((item) => {
    const matchesText =
      term === '' ||
      item.title.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term)
    const matchesCategory = category === '' || item.category === category
    const matchesCondition = condition === '' || item.condition === condition
    return matchesText && matchesCategory && matchesCondition
  })
}
