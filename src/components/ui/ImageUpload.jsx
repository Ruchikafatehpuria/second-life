import { useEffect, useState } from 'react'
import { validateImage } from '../../lib/validation.js'

// Lets the user pick one photo, checks its type and size, and shows a preview.
// The chosen File is passed up with onChange(file), or onChange(null) when removed.
export default function ImageUpload({ id = 'image', onChange, error, onError }) {
  const [previewUrl, setPreviewUrl] = useState(null)

  // A preview URL holds the image in memory. When it is replaced, or this
  // component leaves the page, free that memory.
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  function handleFileChange(event) {
    const chosen = event.target.files?.[0] ?? null
    const problem = validateImage(chosen)
    if (problem) {
      onError(problem)
      onChange(null)
      event.target.value = '' // reset the input so the same file can be re-picked
      return
    }
    onError(null)
    onChange(chosen)
    setPreviewUrl(chosen ? URL.createObjectURL(chosen) : null)
  }

  function handleRemove() {
    onChange(null)
    setPreviewUrl(null)
  }

  const hintId = `${id}-hint`
  const errorId = `${id}-error`

  return (
    <div className="field">
      <label htmlFor={id}>Photo (optional)</label>
      {previewUrl ? (
        <div className="image-preview">
          <img src={previewUrl} alt="Preview of the selected photo" />
          <button type="button" className="btn btn-secondary btn-sm" onClick={handleRemove}>
            Remove photo
          </button>
        </div>
      ) : (
        <input
          id={id}
          type="file"
          className="input input-file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${hintId} ${errorId}` : hintId}
        />
      )}
      <span id={hintId} className="field-hint">
        JPEG, PNG or WebP, up to 5 MB.
      </span>
      {error && (
        <span id={errorId} className="field-error">
          {error}
        </span>
      )}
    </div>
  )
}
