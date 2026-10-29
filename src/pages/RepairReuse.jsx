import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader.jsx'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

const REASONS = [
  {
    icon: '🌍',
    title: 'Less waste',
    text: 'Every item that is repaired or reused is one less item sent to landfill, and one less new product that has to be made.',
  },
  {
    icon: '💰',
    title: 'Save money',
    text: 'A small repair, like a new button, a tightened screw or a replaced cable, often costs far less than buying new.',
  },
  {
    icon: '🛠️',
    title: 'Learn skills',
    text: 'Fixing things builds practical skills and confidence. Many repairs need only basic tools and a little patience.',
  },
  {
    icon: '🤝',
    title: 'Build community',
    text: 'Passing things on and helping neighbours repair them connects people who care about the same things.',
  },
]

const TIPS = [
  'Describe exactly what is broken. "Left speaker silent" is more helpful than "doesn’t work".',
  'Add a clear photo of the item and, if possible, of the damage.',
  'Choose the honest condition — “Needs repair” and “For parts” items are welcome.',
  'Unplug electrical items before inspecting them, and leave mains-voltage repairs to qualified people.',
  'Meet in a public place when handing over items, and never share passwords or payment details in messages.',
]

export default function RepairReuse() {
  useDocumentTitle('Repair & Reuse')

  return (
    <>
      <PageHeader
        title="Repair & Reuse"
        subtitle="Why Second Life exists, and how you can help keep useful things in use."
      />

      <section className="section">
        <div className="container narrow-text">
          <h2>The idea</h2>
          <p>
            Lots of things get thrown away because of a small fault, because they no longer fit, or
            simply because their owner doesn&apos;t need them anymore. Often someone else could use
            them, or fix them with a little effort.
          </p>
          <p>
            Second Life connects those two groups. Owners list items in any condition, and people
            looking for something to reuse, or who enjoy repairing things, can find them and get in
            touch.
          </p>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <h2>Why it matters</h2>
          <div className="grid reasons">
            {REASONS.map((reason) => (
              <div key={reason.title} className="card">
                <span className="step-icon" aria-hidden="true">
                  {reason.icon}
                </span>
                <h3>{reason.title}</h3>
                <p className="muted">{reason.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container narrow-text">
          <h2>How the platform works</h2>
          <ol className="numbered-list">
            <li>
              <strong>Owners post items</strong> with a photo, category and honest condition, from
              “Like new” to “For parts”.
            </li>
            <li>
              <strong>Others browse and search</strong> by keyword, category and condition.
            </li>
            <li>
              <strong>They send a request</strong>: a general inquiry, an offer to repair, or a
              request to reuse. Only the sender and the owner can see it.
            </li>
            <li>
              <strong>The owner responds</strong> by accepting or declining, and the two arrange the
              handover.
            </li>
          </ol>

          <h2>Tips for good listings and safe repairs</h2>
          <ul className="check-list">
            {TIPS.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>

          <div className="btn-group">
            <Link to="/post" className="btn btn-primary">
              Post an item
            </Link>
            <Link to="/browse?condition=needs_repair" className="btn btn-secondary">
              Find items that need repair
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
