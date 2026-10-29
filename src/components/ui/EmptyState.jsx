// Shown when a list has nothing to display, with an optional action (children).
export default function EmptyState({ icon = '🌱', title, message, children }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon" aria-hidden="true">
        {icon}
      </div>
      <h2 className="empty-state-title">{title}</h2>
      {message && <p className="muted">{message}</p>}
      {children && <div className="btn-group empty-state-actions">{children}</div>}
    </div>
  )
}
