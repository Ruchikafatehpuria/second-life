import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader.jsx'
import SampleDataNotice from '../components/ui/SampleDataNotice.jsx'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import { CATEGORIES, REPORT_REASONS } from '../lib/constants.js'
import { SAMPLE_ITEMS, SAMPLE_REPORTS, getSampleItem } from '../data/sampleData.js'

function reasonLabel(value) {
  return REPORT_REASONS.find((r) => r.value === value)?.label ?? value
}

export default function Admin() {
  useDocumentTitle('Admin dashboard')

  // These numbers are counted from the sample data, not from real users.
  const stats = [
    { label: 'Listings', value: SAMPLE_ITEMS.length },
    { label: 'Open reports', value: SAMPLE_REPORTS.filter((r) => r.status === 'open').length },
    { label: 'Categories', value: CATEGORIES.length },
  ]

  return (
    <>
      <PageHeader title="Admin dashboard" subtitle="Review reports, moderate listings and manage categories." />
      <div className="container section stack">
        <SampleDataNotice>
          Layout preview only. In Stage 5 this page is restricted to administrators (checked by the
          database, not just the browser) and moderation actions are enabled.
        </SampleDataNotice>

        <section aria-labelledby="stats-heading">
          <h2 id="stats-heading">Overview</h2>
          <div className="stats">
            {stats.map((stat) => (
              <div key={stat.label} className="card stat">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="reports-heading">
          <h2 id="reports-heading">Reported listings</h2>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Listing</th>
                  <th scope="col">Reason</th>
                  <th scope="col">Details</th>
                  <th scope="col">Status</th>
                  <th scope="col">Reported</th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE_REPORTS.map((report) => {
                  const item = getSampleItem(report.item_id)
                  return (
                    <tr key={report.id}>
                      <td>
                        <Link to={`/items/${item.id}`}>{item.title}</Link>
                      </td>
                      <td>{reasonLabel(report.reason)}</td>
                      <td>{report.details}</td>
                      <td>
                        <span
                          className={`badge ${report.status === 'open' ? 'badge-warning' : 'badge-green'}`}
                        >
                          {report.status}
                        </span>
                      </td>
                      <td>{new Date(report.created_at).toLocaleDateString()}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="categories-heading">
          <h2 id="categories-heading">Categories</h2>
          <ul className="admin-categories">
            {CATEGORIES.map((category) => (
              <li key={category.slug} className="badge">
                <span aria-hidden="true">{category.icon}</span> {category.name}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}
