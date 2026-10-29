import { Link, useNavigate } from 'react-router-dom'
import SearchBar from '../components/ui/SearchBar.jsx'
import ItemCard from '../components/ui/ItemCard.jsx'
import SampleDataNotice from '../components/ui/SampleDataNotice.jsx'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import { CATEGORIES } from '../lib/constants.js'
import { SAMPLE_ITEMS } from '../data/sampleData.js'

const STEPS = [
  {
    icon: '📸',
    title: 'List it',
    text: 'Post an item you no longer need — working, worn out or broken — with a photo and honest description.',
  },
  {
    icon: '🔍',
    title: 'Find it',
    text: 'Search and filter by category and condition to discover things you can use, fix or upcycle.',
  },
  {
    icon: '🤝',
    title: 'Connect',
    text: 'Send a request to the owner to reuse the item or offer to repair it. Requests stay private between you two.',
  },
]

export default function Home() {
  useDocumentTitle('')
  const navigate = useNavigate()

  // Sends the search text to the Browse page as a URL parameter, e.g. /browse?q=desk
  function handleSearch(text) {
    navigate(text ? `/browse?q=${encodeURIComponent(text)}` : '/browse')
  }

  const featured = SAMPLE_ITEMS.slice(0, 4)

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <div className="container hero-inner">
          <p className="hero-eyebrow">Repair · Reuse · Reduce waste</p>
          <h1 className="hero-title">Give your things a second life</h1>
          <p className="hero-text">
            Find pre-loved and repairable items near you, pass on what you no longer need, and
            connect with people who can fix things instead of throwing them away.
          </p>
          <SearchBar onSearch={handleSearch} size="large" />
          <div className="btn-group hero-actions">
            <Link to="/browse" className="btn btn-primary">
              Browse items
            </Link>
            <Link to="/post" className="btn btn-secondary">
              Post an item
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>How Second Life works</h2>
          </div>
          <ol className="steps">
            {STEPS.map((step, index) => (
              <li key={step.title} className="card step">
                <span className="step-icon" aria-hidden="true">
                  {step.icon}
                </span>
                <h3>
                  {index + 1}. {step.title}
                </h3>
                <p className="muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Categories ---------- */}
      <section className="section section-cream">
        <div className="container">
          <div className="section-header">
            <h2>Browse by category</h2>
            <Link to="/browse">See all items →</Link>
          </div>
          <ul className="category-grid">
            {CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link to={`/browse?category=${category.slug}`} className="category-tile">
                  <span className="category-icon" aria-hidden="true">
                    {category.icon}
                  </span>
                  <span>{category.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Featured items ---------- */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Recently listed</h2>
            <Link to="/browse">View all →</Link>
          </div>
          <SampleDataNotice />
          <div className="grid grid-items">
            {featured.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Call to action ---------- */}
      <section className="cta-band">
        <div className="container cta-inner">
          <div>
            <h2>Something broken? Don&apos;t bin it yet.</h2>
            <p>Learn how repair and reuse keep useful things out of landfill.</p>
          </div>
          <div className="btn-group">
            <Link to="/repair-reuse" className="btn btn-secondary">
              Why repair &amp; reuse
            </Link>
            <Link to="/register" className="btn btn-primary btn-on-dark">
              Join Second Life
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
