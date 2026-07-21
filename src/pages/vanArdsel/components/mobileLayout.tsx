import { FC, PropsWithChildren } from 'react'
import IconElement from '@/components/iconElement/IconElement'
import { ReactComponent as Wifi } from '../../../assests/mobile/Wifi.svg'
import { ReactComponent as Cellular } from '../../../assests/mobile/Cellular.svg'
import { ReactComponent as Battery } from '../../../assests/mobile/Battery.svg'
import { ReactComponent as Avator } from '../../../assests/mobile/Avatar-no-tick.svg'
import { ReactComponent as Bot } from '../../../assests/mobile/Bot.svg'
import { More } from 'iconsax-react'
import { NavLink } from 'react-router-dom'

const navLinks = [
  { name: 'Home', path: '/van-ardsel/home' },
  { name: 'Timeline', path: '/van-ardsel/timeline' },
  { name: 'Assigned to Me', path: '/van-ardsel/assigned-to-me' },
  { name: 'Chat', path: '/van-ardsel/chat' },
]

const MobileLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='w-full flex mx-auto mt-4 flex-wrap'>
      <header className='flex justify-between w-full mx-4'>
        <p className='text-lg font-semibold'>12:15</p>
        <div className='flex items-center gap-x-2'>
          <IconElement className='w-5 h-5' icon={Cellular} />
          <IconElement className='w-5 h-5' icon={Wifi} />
          <IconElement className='w-5 h-5' icon={Battery} />
        </div>
      </header>

      <div className='mx-4 flex items-center mt-2 justify-between w-full'>
        <div className='flex items-center gap-x-2'>
          <IconElement className='w-5 h-5 cursor-pointer' icon={Avator} />
          <p className='text-2xl font-semibold'>Van Arsdel</p>
        </div>
        <div className='flex items-center gap-x-5'>
          <IconElement className='w-5 h-5 cursor-pointer' icon={Bot} />
          <IconElement className='w-5 h-5 cursor-pointer' icon={More} />
        </div>
      </div>
      <nav className='flex gap-x-4 w-full justify-between mx-4'>
        {navLinks.map(({ name, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `block p-1 relative text-[#424242] ${isActive ? 'border-b-2 border-[#5B5FC7] rounded-sm text-lg font-bold 	' : ''}`
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
