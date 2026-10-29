import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ItemImage from '../components/ui/ItemImage.jsx'
import ItemCard from '../components/ui/ItemCard.jsx'
import ConditionBadge from '../components/ui/ConditionBadge.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import FormField from '../components/ui/FormField.jsx'
import Alert from '../components/ui/Alert.jsx'
import SampleDataNotice from '../components/ui/SampleDataNotice.jsx'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import { getCategory, REQUEST_TYPES, REPORT_REASONS } from '../lib/constants.js'
import { validateContactRequest, validateReport, hasErrors } from '../lib/validation.js'
import { SAMPLE_ITEMS, getSampleItem } from '../data/sampleData.js'

export default function ItemDetails() {
  const { id } = useParams() // the ":id" part of /items/:id
  const item = getSampleItem(id)
  useDocumentTitle(item ? item.title : 'Item not found')

  if (!item) {
    return (
      <div className="container section">
        <EmptyState
          icon="🧐"
          title="Item not found"
          message="This item may have been removed, or the link is incorrect."
        >
          <Link to="/browse" className="btn btn-primary">
            Back to browse
          </Link>
        </EmptyState>
      </div>
    )
  }

  // key={item.id} gives the page fresh form state when you move to a different item.
  return <ItemDetailsView key={item.id} item={item} />
}

function ItemDetailsView({ item }) {
  const category = getCategory(item.category)
  const similar = SAMPLE_ITEMS.filter(
    (other) => other.category === item.category && other.id !== item.id,
  ).slice(0, 3)

  // Stage 2: saving only changes what you see on this page.
  // Stage 4 stores it in the saved_items table.
  const [saved, setSaved] = useState(false)

  return (
    <div className="container section">
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <Link to="/browse">Browse</Link> <span aria-hidden="true">/</span>{' '}
        {category && (
          <>
            <Link to={`/browse?category=${category.slug}`}>{category.name}</Link>{' '}
            <span aria-hidden="true">/</span>{' '}
          </>
        )}
        <span aria-current="page">{item.title}</span>
      </nav>

      <SampleDataNotice>
        This is a sample listing for previewing the layout. It is not a real item.
      </SampleDataNotice>

      <div className="details">
        <ItemImage item={item} large />

        <div className="details-info">
          <div className="item-card-badges">
            {category && <span className="badge">{category.name}</span>}
            <ConditionBadge condition={item.condition} />
          </div>
          <h1>{item.title}</h1>
          <p className="details-description">{item.description}</p>

          <dl className="details-meta">
            <div>
              <dt>Listed by</dt>
              <dd>{item.owner.name}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{item.owner.location}</dd>
            </div>
            <div>
              <dt>Listed on</dt>
              <dd>{new Date(item.created_at).toLocaleDateString()}</dd>
            </div>
          </dl>

          <div className="btn-group">
            <button
              type="button"
              className={saved ? 'btn btn-primary' : 'btn btn-secondary'}
              aria-pressed={saved}
              onClick={() => setSaved((value) => !value)}
            >
              {saved ? '♥ Saved' : '♡ Save item'}
            </button>
            <a href="#contact-owner" className="btn btn-ghost">
              Contact owner
            </a>
          </div>

          <ContactOwnerForm />
          <ReportForm />
        </div>
      </div>

      {similar.length > 0 && (
        <section className="section" aria-labelledby="similar-heading">
          <h2 id="similar-heading">More in {category?.name}</h2>
          <div className="grid grid-items">
            {similar.map((other) => (
              <ItemCard key={other.id} item={other} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function ContactOwnerForm() {
  const [values, setValues] = useState({ type: 'inquiry', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const found = validateContactRequest(values)
    setErrors(found)
    setSubmitted(!hasErrors(found))
  }

  return (
    <section id="contact-owner" className="card details-form" aria-labelledby="contact-heading">
      <h2 id="contact-heading">Contact the owner</h2>
      <p className="muted">Your message is only visible to you and the owner.</p>
      {submitted && (
        <Alert variant="info" title="Form looks good — not sent yet">
          Sending requests is connected to the database in Stage 4. Nothing was sent.
        </Alert>
      )}
      <form className="form" onSubmit={handleSubmit} noValidate>
        <FormField
          id="type"
          label="Request type"
          as="select"
          options={REQUEST_TYPES}
          value={values.type}
          onChange={handleChange}
          error={errors.type}
          required
        />
        <FormField
          id="message"
          label="Message"
          as="textarea"
          value={values.message}
          onChange={handleChange}
          error={errors.message}
          hint="Introduce yourself and say how you would reuse or repair the item."
          maxLength={1000}
          required
        />
        <button type="submit" className="btn btn-primary">
          Send request
        </button>
      </form>
    </section>
  )
}

function ReportForm() {
  const [values, setValues] = useState({ reason: '', details: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const found = validateReport(values)
    setErrors(found)
    setSubmitted(!hasErrors(found))
  }

  return (
    <details className="report">
      <summary>Report this listing</summary>
      {submitted && (
        <Alert variant="info" title="Form looks good — not sent yet">
          Reports are saved to the database in Stage 4. Nothing was sent.
        </Alert>
      )}
      <form className="form" onSubmit={handleSubmit} noValidate>
        <FormField
          id="reason"
          label="Reason"
          as="select"
          options={REPORT_REASONS}
          placeholderOption="Choose a reason"
          value={values.reason}
          onChange={handleChange}
          error={errors.reason}
          required
        />
        <FormField
          id="details"
          label="Details (optional)"
          as="textarea"
          value={values.details}
          onChange={handleChange}
          error={errors.details}
          maxLength={500}
        />
        <button type="submit" className="btn btn-danger btn-sm">
          Submit report
        </button>
      </form>
    </details>
  )
}
