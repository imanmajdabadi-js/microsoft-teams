import { FC, PropsWithChildren } from 'react'
import IconElement from '@/components/iconElement/IconElement'
import { NavLink } from 'react-router-dom'
import { ReactComponent as VanIConBlack } from '../../../assets/icons/VanIconBlack.svg'

const navLinks = [
  { name: 'Home', path: '/van-arsdel/home' },
  { name: 'Timeline', path: '/van-arsdel/timeline' },
  { name: 'Assigned to Me', path: '/van-arsdel/assigned-to-me' },
  { name: 'Decisions', path: '/van-arsdel/decisions' },
]

const DesktopLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className='flex items-center border-b w-full px-4 my-4'>
        <div className='flex items-center gap-x-4'>
          <div className='flex h-10 gap-x-2'>
            <IconElement icon={VanIConBlack} />
            <p className='text-lg font-bold text-ink-strong'>Van Arsdel</p>
          </div>

          <nav className='flex gap-x-4'>
            {navLinks.map(({ name, path }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `relative block border-b-2 px-1 py-2 text-sm ${
                    isActive
                      ? 'border-brand font-semibold text-ink-strong'
                      : 'border-transparent text-ink hover:text-ink-strong'
                  }`
                }
              >
                {name}
              </NavLink>
            ))}
          </nav>
        </div>

      </div>
      <div>{children}</div>
    </>
  )
}

export default DesktopLayout
