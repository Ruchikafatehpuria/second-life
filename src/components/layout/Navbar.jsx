import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const MAIN_LINKS = [
  { to: '/browse', label: 'Browse' },
  { to: '/repair-reuse', label: 'Repair & Reuse' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  // On small screens the menu is hidden behind a "Menu" button.
  const [menuOpen, setMenuOpen] = useState(false)

  // Close the mobile menu when any link inside it is clicked.
  function handleNavClick(event) {
    if (event.target.closest('a')) setMenuOpen(false)
  }

  // NavLink adds the "active" class automatically when its page is open.
  const linkClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand" aria-label="Second Life home">
          <img src="/favicon.svg" alt="" width="32" height="32" />
          <span>Second Life</span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
          <span className="visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
        </button>

        <nav id="main-menu" className={menuOpen ? 'nav open' : 'nav'} aria-label="Main" onClick={handleNavClick}>
          <ul className="nav-list">
            {MAIN_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={linkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
            {/* In Stage 3 these links will change depending on whether you are logged in. */}
            <li>
              <NavLink to="/dashboard" className={linkClass}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className={linkClass}>
                Log in
              </NavLink>
            </li>
          </ul>
          <Link to="/post" className="btn btn-primary btn-sm nav-cta">
            + Post an item
          </Link>
        </nav>
      </div>
    </header>
  )
}
