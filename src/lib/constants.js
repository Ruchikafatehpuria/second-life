// Fixed lists used across the app.
// In Stage 3 the categories will live in the database (so admins can manage them);
// conditions stay here because they are a fixed set enforced by the database too.

export const CATEGORIES = [
  { slug: 'electronics', name: 'Electronics', icon: '🔌' },
  { slug: 'furniture', name: 'Furniture', icon: '🪑' },
  { slug: 'clothing', name: 'Clothing', icon: '👕' },
  { slug: 'books', name: 'Books & Study', icon: '📚' },
  { slug: 'kitchen', name: 'Kitchen', icon: '🍳' },
  { slug: 'toys', name: 'Toys & Games', icon: '🧸' },
  { slug: 'sports', name: 'Sports & Outdoors', icon: '🚲' },
  { slug: 'tools', name: 'Tools & DIY', icon: '🔧' },
]

export const CONDITIONS = [
  { value: 'like_new', label: 'Like new' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'needs_repair', label: 'Needs repair' },
  { value: 'for_parts', label: 'For parts' },
]

export const REQUEST_TYPES = [
  { value: 'inquiry', label: 'General inquiry' },
  { value: 'repair', label: 'I can repair this' },
  { value: 'reuse', label: 'I would like to reuse this' },
]

export const REPORT_REASONS = [
  { value: 'spam', label: 'Spam or advertising' },
  { value: 'prohibited', label: 'Prohibited or unsafe item' },
  { value: 'misleading', label: 'Misleading description' },
  { value: 'offensive', label: 'Offensive content' },
  { value: 'other', label: 'Other' },
]

export function getCategory(slug) {
  return CATEGORIES.find((c) => c.slug === slug)
}

export function getConditionLabel(value) {
  return CONDITIONS.find((c) => c.value === value)?.label ?? value
}

export function getRequestTypeLabel(value) {
  return REQUEST_TYPES.find((r) => r.value === value)?.label ?? value
}
