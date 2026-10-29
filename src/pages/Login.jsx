import { useState } from 'react'
import { Link } from 'react-router-dom'
import FormField from '../components/ui/FormField.jsx'
import Alert from '../components/ui/Alert.jsx'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import { validateLogin, hasErrors } from '../lib/validation.js'

export default function Login() {
  useDocumentTitle('Log in')
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const found = validateLogin(values)
    setErrors(found)
    setSubmitted(!hasErrors(found))
  }

  return (
    <div className="auth-page">
      <div className="card auth-card">
        <h1>Welcome back</h1>
        <p className="muted">Log in to post items, save favourites and send requests.</p>

        {submitted && (
          <Alert variant="info" title="Form looks good — not logged in yet">
            Login with Supabase Auth is connected in Stage 3.
          </Alert>
        )}

        <form className="form" onSubmit={handleSubmit} noValidate>
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
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            required
          />
          <button type="submit" className="btn btn-primary btn-block">
            Log in
          </button>
        </form>

        <p className="auth-switch">
          New to Second Life? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  )
}
