import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader.jsx'
import FormField from '../components/ui/FormField.jsx'
import ImageUpload from '../components/ui/ImageUpload.jsx'
import Alert from '../components/ui/Alert.jsx'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import { CATEGORIES, CONDITIONS } from '../lib/constants.js'
import { validateItem, hasErrors, LIMITS } from '../lib/validation.js'

const EMPTY_FORM = { title: '', description: '', category: '', condition: '' }
const CATEGORY_OPTIONS = CATEGORIES.map((c) => ({ value: c.slug, label: c.name }))

export default function PostItem() {
  useDocumentTitle('Post an item')
  const [values, setValues] = useState(EMPTY_FORM)
  const [imageFile, setImageFile] = useState(null)
  const [imageError, setImageError] = useState(null)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  // One handler for every text field: it uses the field's name to update the right value.
  function handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const found = validateItem(values)
    setErrors(found)
    const ok = !hasErrors(found) && !imageError
    setSubmitted(ok)
    if (!ok) {
      // Move keyboard focus to the first field with a problem.
      const firstInvalid = Object.keys(found)[0]
      if (firstInvalid) document.getElementById(firstInvalid)?.focus()
    }
  }

  return (
    <>
      <PageHeader
        title="Post an item"
        subtitle="Give something you no longer need a second life. Broken items are welcome too — someone may be able to fix them."
      />
      <div className="container section narrow">
        {submitted && (
          <Alert variant="info" title="Form looks good — not saved yet">
            Saving listings and uploading photos is connected in Stage 4, after login is set up
            in Stage 3. Nothing was saved.
            {imageFile && <> Photo selected: {imageFile.name}.</>}
          </Alert>
        )}

        <form className="form card" onSubmit={handleSubmit} noValidate>
          <FormField
            id="title"
            label="Title"
            value={values.title}
            onChange={handleChange}
            error={errors.title}
            hint={`A short name for the item (${LIMITS.titleMin}–${LIMITS.titleMax} characters).`}
            maxLength={LIMITS.titleMax}
            placeholder="e.g. Wooden study desk with drawer"
            required
          />
          <FormField
            id="description"
            label="Description"
            as="textarea"
            value={values.description}
            onChange={handleChange}
            error={errors.description}
            hint="Describe its condition honestly. If it is broken, say what is wrong."
            maxLength={LIMITS.descriptionMax}
            required
          />
          <div className="form-row">
            <FormField
              id="category"
              label="Category"
              as="select"
              options={CATEGORY_OPTIONS}
              placeholderOption="Choose a category"
              value={values.category}
              onChange={handleChange}
              error={errors.category}
              required
            />
            <FormField
              id="condition"
              label="Condition"
              as="select"
              options={CONDITIONS}
              placeholderOption="Choose a condition"
              value={values.condition}
              onChange={handleChange}
              error={errors.condition}
              required
            />
          </div>
          <ImageUpload
            onChange={setImageFile}
            error={imageError}
            onError={setImageError}
          />
          <div className="btn-group">
            <button type="submit" className="btn btn-primary">
              Post item
            </button>
            <Link to="/browse" className="btn btn-ghost">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}
