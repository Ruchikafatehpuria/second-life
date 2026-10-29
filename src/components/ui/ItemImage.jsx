import { getCategory } from '../../lib/constants.js'

// Shows the item's photo, or a friendly placeholder with the category icon
// when no photo was uploaded.
export default function ItemImage({ item, large = false }) {
  const className = large ? 'item-image item-image-large' : 'item-image'

  if (item.image_url) {
    return (
      <div className={className}>
        <img src={item.image_url} alt={item.title} loading="lazy" />
      </div>
    )
  }

  const category = getCategory(item.category)
  return (
    <div className={`${className} item-image-placeholder`} role="img" aria-label="No photo provided">
      <span aria-hidden="true">{category?.icon ?? '♻️'}</span>
    </div>
  )
}
