import { ComponentProps } from 'react'

interface NavLinkProps extends ComponentProps<'a'> {
  children: string
}

export function NavLink(props: NavLinkProps) {
  return (
    <nav className="flex items-center gap-5">
      <a {...props} className="font-medium text-sm text-zinc-300">
        {props.children}
      </a>
    </nav>
  )
}
