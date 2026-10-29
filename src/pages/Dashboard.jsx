import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader.jsx'
import ItemCard from '../components/ui/ItemCard.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import SampleDataNotice from '../components/ui/SampleDataNotice.jsx'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import { getRequestTypeLabel } from '../lib/constants.js'
import {
  SAMPLE_MY_LISTING_IDS,
  SAMPLE_SAVED_IDS,
  SAMPLE_REQUESTS,
  getSampleItem,
} from '../data/sampleData.js'

const TABS = [
  { id: 'listings', label: 'My listings' },
  { id: 'saved', label: 'Saved items' },
  { id: 'requests', label: 'Requests' },
]

export default function Dashboard() {
  useDocumentTitle('Dashboard')
  const [activeTab, setActiveTab] = useState('listings')

  const myListings = SAMPLE_MY_LISTING_IDS.map(getSampleItem)
  const savedItems = SAMPLE_SAVED_IDS.map(getSampleItem)

  return (
    <>
      <PageHeader title="Your dashboard" subtitle="Manage your listings, saved items and requests." />
      <div className="container section">
        <SampleDataNotice>
          Layout preview with sample data. From Stage 3 this page requires login, and from Stage 4
          it shows your real listings, saved items and requests.
        </SampleDataNotice>

        <div className="tabs" role="tablist" aria-label="Dashboard sections">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              className={activeTab === tab.id ? 'tab active' : 'tab'}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
          {activeTab === 'listings' && <ItemList items={myListings} kind="listings" />}
          {activeTab === 'saved' && <ItemList items={savedItems} kind="saved" />}
          {activeTab === 'requests' && <RequestList requests={SAMPLE_REQUESTS} />}
        </div>
      </div>
    </>
  )
}

function ItemList({ items, kind }) {
  if (items.length === 0) {
    return kind === 'listings' ? (
      <EmptyState title="You have no listings yet" message="Post your first item in a minute.">
        <Link to="/post" className="btn btn-primary">
          Post an item
        </Link>
      </EmptyState>
    ) : (
      <EmptyState icon="♡" title="No saved items" message="Tap “Save item” on any listing to keep it here.">
        <Link to="/browse" className="btn btn-primary">
          Browse items
        </Link>
      </EmptyState>
    )
  }

  return (
    <>
      {kind === 'listings' && (
        <div className="panel-actions">
          <Link to="/post" className="btn btn-primary btn-sm">
            + Post a new item
          </Link>
        </div>
      )}
      <div className="grid grid-items">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </>
  )
}

const STATUS_STYLES = {
  pending: 'badge-warning',
  accepted: 'badge-green',
  declined: 'badge-danger',
  completed: 'badge-info',
}

function RequestList({ requests }) {
  if (requests.length === 0) {
    return (
      <EmptyState icon="✉️" title="No requests yet" message="Requests you send or receive will appear here." />
    )
  }

  return (
    <ul className="request-list">
      {requests.map((request) => {
        const item = getSampleItem(request.item_id)
        return (
          <li key={request.id} className="card request">
            <div className="request-header">
              <span className="badge">
                {request.direction === 'received' ? '📥 Received' : '📤 Sent'}
              </span>
              <span className={`badge ${STATUS_STYLES[request.status] ?? ''}`}>{request.status}</span>
            </div>
            <h3>
              <Link to={`/items/${item.id}`}>{item.title}</Link>
            </h3>
            <p className="muted request-meta">
              {getRequestTypeLabel(request.type)} ·{' '}
              {request.direction === 'received' ? 'from' : 'to'} {request.other_person} ·{' '}
              {new Date(request.created_at).toLocaleDateString()}
            </p>
            <p className="request-message">“{request.message}”</p>
          </li>
        )
      })}
    </ul>
  )
}
