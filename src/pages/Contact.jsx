import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader.jsx'
import FormField from '../components/ui/FormField.jsx'
import Alert from '../components/ui/Alert.jsx'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import { validateContactMessage, hasErrors, LIMITS } from '../lib/validation.js'

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  useDocumentTitle('Contact')
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const found = validateContactMessage(values)
    setErrors(found)
    setSubmitted(!hasErrors(found))
  }

  return (
    <>
      <PageHeader
        title="Contact us"
        subtitle="Questions, feedback or ideas for Second Life? Send us a message."
      />
      <div className="container section contact-layout">
        <div>
          {submitted && (
            <Alert variant="info" title="Form looks good — not sent yet">
              Messages are stored in the database from Stage 3. Nothing was sent.
            </Alert>
          )}
          <form className="form card" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <FormField
                id="name"
                label="Your name"
                autoComplete="name"
                value={values.name}
                onChange={handleChange}
                error={errors.name}
                maxLength={LIMITS.nameMax}
                required
              />
              <FormField
                id="email"
                label="Email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
                required
              />
            </div>
            <FormField
              id="subject"
              label="Subject"
              value={values.subject}
              onChange={handleChange}
              error={errors.subject}
              maxLength={120}
              required
            />
            <FormField
              id="message"
              label="Message"
              as="textarea"
              value={values.message}
              onChange={handleChange}
              error={errors.message}
              maxLength={LIMITS.messageMax}
              required
            />
            <button type="submit" className="btn btn-primary">
              Send message
            </button>
          </form>
        </div>

        <aside className="card contact-aside">
          <h2>Before you write</h2>
          <ul className="check-list">
            <li>
              Questions about a specific item? Use <strong>Contact owner</strong> on the item&apos;s
              page so the owner gets your message.
            </li>
            <li>
              Seen something unsafe or misleading? Use <strong>Report this listing</strong> on the
              item page so our admins can review it.
            </li>
            <li>
              Want to know more about the project? Read the <Link to="/about">About page</Link>.
            </li>
          </ul>
        </aside>
      </div>
    </>
  )
}
