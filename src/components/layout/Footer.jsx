import { Link } from 'react-router-dom'

const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link to="/" className="brand brand-light">
            <img src="/favicon.svg" alt="" width="28" height="28" />
            <span>Second Life</span>
          </Link>
          <p>Repair it. Reuse it. Give your things a second life.</p>
        </div>

        <nav aria-label="Explore" className="footer-col">
          <h2 className="footer-heading">Explore</h2>
          <ul>
            <li><Link to="/browse">Browse items</Link></li>
            <li><Link to="/post">Post an item</Link></li>
            <li><Link to="/repair-reuse">Repair &amp; Reuse</Link></li>
          </ul>
        </nav>

        <nav aria-label="Account" className="footer-col">
          <h2 className="footer-heading">Account</h2>
          <ul>
            <li><Link to="/login">Log in</Link></li>
            <li><Link to="/register">Create account</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            {/* Temporary preview link. From Stage 3, only admins will see an admin link. */}
            <li><Link to="/admin">Admin (preview)</Link></li>
          </ul>
        </nav>

        <nav aria-label="Company" className="footer-col">
          <h2 className="footer-heading">Second Life</h2>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
      <div className="container footer-bottom">
        <p>© {CURRENT_YEAR} Second Life · A student project</p>
      </div>
    </footer>
  )
}
