import { Link } from 'react-router-dom'
import EmptyState from '../components/ui/EmptyState.jsx'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

// Shown for any URL that doesn't match a route.
export default function NotFound() {
  useDocumentTitle('Page not found')
  return (
    <div className="container section">
      <EmptyState icon="🍂" title="Page not found" message="The page you are looking for doesn't exist or has moved.">
        <Link to="/" className="btn btn-primary">
          Go home
        </Link>
        <Link to="/browse" className="btn btn-secondary">
          Browse items
        </Link>
      </EmptyState>
    </div>
  )
}
