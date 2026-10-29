import { Link } from 'react-router-dom'
import { getCategory } from '../../lib/constants.js'
import ItemImage from './ItemImage.jsx'
import ConditionBadge from './ConditionBadge.jsx'

// A clickable card showing a short preview of one item.
// `footer` lets a page add extra content (e.g. a recommendation reason).
export default function ItemCard({ item, footer }) {
  const category = getCategory(item.category)

  return (
    <article className="item-card">
      <Link to={`/items/${item.id}`} className="item-card-link">
        <ItemImage item={item} />
        <div className="item-card-body">
          <div className="item-card-badges">
            {category && <span className="badge">{category.name}</span>}
            <ConditionBadge condition={item.condition} />
          </div>
          <h3 className="item-card-title">{item.title}</h3>
          <p className="item-card-desc">{item.description}</p>
          {item.owner?.location && (
            <p className="item-card-meta">
              <span aria-hidden="true">📍</span> {item.owner.location}
            </p>
          )}
        </div>
      </Link>
      {footer && <div className="item-card-footer">{footer}</div>}
    </article>
  )
}
