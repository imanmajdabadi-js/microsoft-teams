import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import IconElement from '../iconElement/IconElement'
import { ReactComponent as Van } from '../../assests/icons/Van.svg'

const Navbar: FC = () => {
  return (
    <aside
      className='h-full w-20 shrink-0 bg-custom-gradient-navbar-header py-4'
      aria-label='Workspace navigation'
    >
      <NavLink
        to='/van-ardsel'
        className={({ isActive }) => `flex w-full flex-col items-center gap-2 border-l-2
          px-1 py-3 ${isActive ? 'border-[#5B5FC7]' : 'border-transparent'}`}
      >
        <IconElement icon={Van} />
        <span className='text-center text-[10px] leading-4 text-[#242424]'>Van Arsdel</span>
      </NavLink>
    </aside>
  )
}

export default Navbar
