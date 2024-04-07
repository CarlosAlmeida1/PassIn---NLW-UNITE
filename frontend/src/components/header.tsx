import nlwUniteIcon from '../assets/nlw-unite-icon.svg'
import { NavLink } from './nav-link'

export function Header() {
  return (
    <div className="flex items-center gap-5 py-2">
      <img src={nlwUniteIcon} alt="NLW unite" />

      <NavLink href="/events">Events</NavLink>
      <NavLink href="/attendees">Attendees</NavLink>
    </div>
  )
}
