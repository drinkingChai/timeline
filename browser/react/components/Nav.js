import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ()=> {
  return (
    <nav>
      <li><Link to="/stories">Stories</Link></li>
      <li><Link to="/timelines">Timelines</Link></li>
      <li><Link to="/new-timelines">New Timelines</Link></li>
    </nav>
  )
}

export default Nav
