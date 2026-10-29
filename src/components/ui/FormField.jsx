// One labelled form control (input, textarea or select) with a hint and an error message.
// It wires up the accessibility attributes for you:
//  - the <label> points at the control (htmlFor/id)
//  - aria-invalid marks the control red when there is an error
//  - aria-describedby makes screen readers read the hint and error aloud
export default function FormField({
  id,
  label,
  as = 'input',
  error,
  hint,
  required = false,
  options,
  placeholderOption,
  ...controlProps
}) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  const sharedProps = {
    id,
    name: id,
    required,
    'aria-invalid': error ? 'true' : 'false',
    'aria-describedby': describedBy,
    ...controlProps,
  }

  let control
  if (as === 'textarea') {
    control = <textarea className="textarea" {...sharedProps} />
  } else if (as === 'select') {
    control = (
      <select className="select" {...sharedProps}>
        {placeholderOption && <option value="">{placeholderOption}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )
  } else {
    control = <input className="input" {...sharedProps} />
  }

  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {required && (
          <span className="required" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {control}
      {hint && (
        <span id={hintId} className="field-hint">
          {hint}
        </span>
      )}
      {error && (
        <span id={errorId} className="field-error">
          {error}
        </span>
      )}
    </div>
  )
}
