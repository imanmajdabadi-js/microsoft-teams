import { FC, PropsWithChildren } from 'react'
import { NavLink } from 'react-router-dom'

const navLinks = [
  { name: 'Home', path: '/van-arsdel/home' },
  { name: 'Timeline', path: '/van-arsdel/timeline' },
  { name: 'Assigned to Me', path: '/van-arsdel/assigned-to-me' },
  { name: 'Decisions', path: '/van-arsdel/decisions' },
]

const MobileLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='w-full flex mx-auto flex-wrap'>
      <header className='mx-4 flex w-full items-center py-3'>
        <div className='flex items-center gap-x-2'>
          <span
            className='flex h-6 w-6 items-center justify-center rounded-full bg-[#5B5FC7] text-[9px] font-semibold text-white'
            aria-hidden='true'
          >
            VA
          </span>
          <p className='text-2xl font-semibold'>Van Arsdel</p>
        </div>
      </header>
      <nav className='mx-4 flex w-full gap-5 overflow-x-auto'>
        {navLinks.map(({ name, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `relative block whitespace-nowrap border-b-2 px-1 py-2 text-sm ${
                isActive
                  ? 'border-[#5B5FC7] font-semibold text-[#242424]'
                  : 'border-transparent text-[#424242]'
              }`
            }
          >
            {name}
          </NavLink>
        ))}
      </nav>
      <div className='w-full min-w-0'>{children}</div>
    </div>
  )
}

export default MobileLayout
