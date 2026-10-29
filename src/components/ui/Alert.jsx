// A coloured message box for info, success, warning and error messages.
// Errors use role="alert" so screen readers announce them immediately.
const ICONS = { info: 'ℹ️', success: '✅', warning: '⚠️', error: '⛔' }

export default function Alert({ variant = 'info', title, children }) {
  return (
    <div className={`alert alert-${variant}`} role={variant === 'error' ? 'alert' : 'status'}>
      <span className="alert-icon" aria-hidden="true">
        {ICONS[variant]}
      </span>
      <div>
        {title && <strong className="alert-title">{title}</strong>}
        <div>{children}</div>
      </div>
    </div>
  )
}
