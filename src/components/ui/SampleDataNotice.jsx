// Clearly labels any section that shows made-up development data,
// so sample records are never mistaken for real ones.
export default function SampleDataNotice({ children }) {
  return (
    <p className="sample-notice">
      <span className="badge badge-warning">Sample data</span>
      <span>
        {children ??
          'Development preview only. These are not real listings and will be replaced with real data from the database.'}
      </span>
    </p>
  )
}
