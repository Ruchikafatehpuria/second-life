// The green banner at the top of most pages, with a title and optional subtitle.
export default function PageHeader({ title, subtitle, children }) {
  return (
    <section className="page-header">
      <div className="container">
        <h1>{title}</h1>
        {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
        {children}
      </div>
    </section>
  )
}
