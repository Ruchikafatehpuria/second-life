import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader.jsx'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

const TECH = [
  { name: 'React + Vite', role: 'User interface and fast development builds' },
  { name: 'React Router', role: 'Navigation between pages' },
  { name: 'Supabase Auth', role: 'Account registration and login' },
  { name: 'Supabase PostgreSQL', role: 'Database, secured with Row Level Security' },
  { name: 'Supabase Storage', role: 'Item photos' },
  { name: 'Vercel', role: 'Hosting the website' },
]

export default function About() {
  useDocumentTitle('About')

  return (
    <>
      <PageHeader title="About Second Life" subtitle="A student project about repair, reuse and community." />
      <section className="section">
        <div className="container narrow-text">
          <h2>Our mission</h2>
          <p>
            Second Life makes it easy to pass on things you no longer need and to find things you
            can reuse or repair. The goal is simple: keep useful items in use for longer and out of
            the bin.
          </p>

          <h2>Who built it</h2>
          <p>
            Second Life was designed and built by a first-year Computer Science Engineering student
            as a portfolio project, to practise building a complete, secure web application from
            database to deployment.
          </p>

          <h2>How it&apos;s built</h2>
          <ul className="tech-list">
            {TECH.map((tech) => (
              <li key={tech.name}>
                <strong>{tech.name}</strong> — <span className="muted">{tech.role}</span>
              </li>
            ))}
          </ul>
          <p>
            Recommendations use a simple, explainable scoring method based on categories, keywords
            and your preferences — not a machine-learning model — so every suggestion comes with the
            reason it was shown.
          </p>

          <div className="btn-group">
            <Link to="/repair-reuse" className="btn btn-primary">
              Why repair &amp; reuse
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
