import { useState } from 'react'
import { Link } from 'react-router-dom'
import FormField from '../components/ui/FormField.jsx'
import Alert from '../components/ui/Alert.jsx'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import { validateRegister, hasErrors, LIMITS } from '../lib/validation.js'

export default function Register() {
  useDocumentTitle('Create account')
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const found = validateRegister(values)
    setErrors(found)
    setSubmitted(!hasErrors(found))
  }

  return (
    <div className="auth-page">
      <div className="card auth-card">
        <h1>Create your account</h1>
        <p className="muted">Join the community keeping useful things in use.</p>

        {submitted && (
          <Alert variant="info" title="Form looks good — no account created yet">
            Registration with Supabase Auth is connected in Stage 3.
          </Alert>
        )}

        <form className="form" onSubmit={handleSubmit} noValidate>
          <FormField
            id="fullName"
            label="Full name"
            autoComplete="name"
            value={values.fullName}
            onChange={handleChange}
            error={errors.fullName}
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
          <FormField
            id="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            hint={`At least ${LIMITS.passwordMin} characters.`}
            required
          />
          <FormField
            id="confirmPassword"
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            value={values.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
          />
          <button type="submit" className="btn btn-primary btn-block">
            Create account
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  )
}
