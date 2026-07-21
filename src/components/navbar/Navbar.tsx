import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import IconElement from '../iconElement/IconElement'
import { Call, Notification } from 'iconsax-react'
import { ReactComponent as Chat } from '../../assests/icons/chat.svg'
import { ReactComponent as TeamsIcon } from '../../assests/icons/Teams-gray.svg'
import { ReactComponent as Calendar } from '../../assests/icons/Calendar.svg'
import { ReactComponent as Files } from '../../assests/icons/Files.svg'
import { ReactComponent as Van } from '../../assests/icons/Van.svg'
import { ReactComponent as Apps } from '../../assests/icons/Apps.svg'
import { ReactComponent as More } from '../../assests/icons/More.svg'
import useDevice from '@/hooks/useDevice'
import { mergeClasses } from '../utils'

const mainNavItems = [
  { name: 'Activity', path: '/activity', icon: <IconElement icon={Notification} /> },
  { name: 'Chat', path: '/chat', icon: <IconElement icon={Chat} /> },
  { name: 'Teams', path: '/teams', icon: <IconElement icon={TeamsIcon} /> },
  { name: 'Calendar', path: '/calendar', icon: <IconElement icon={Calendar} /> },
  { name: 'Calls', path: '/calls', icon: <IconElement icon={Call} /> },
  { name: 'Files', path: '/files', icon: <IconElement icon={Files} /> },
  { name: 'Van Arsdel', path: '/van-ardsel', icon: <IconElement icon={Van} /> },
  { name: 'Apps', path: '/apps', icon: <IconElement icon={Apps} /> },
]

const moreNavItem = { name: 'More', path: '/more', icon: <IconElement icon={More} /> }

const Navbar: FC = () => {
  const { isTabletOrMobile } = useDevice()

  let wrapperClass = 'bg-custom-gradient-navbar-header w-20 h-full flex flex-col'
  let innerWrapperClass = 'flex flex-col items-center'

  if (isTabletOrMobile) {
    wrapperClass = mergeClasses(wrapperClass, 'w-full', 'h-auto', 'flex-row')
    innerWrapperClass = mergeClasses(
      innerWrapperClass,
      'flex-row',
      'gap-2',
      'justify-around',
      'py-2',
      'w-full',
    )
  }

  const visibleNavItems = isTabletOrMobile
    ? [...mainNavItems.slice(0, 4), moreNavItem]
    : [...mainNavItems.slice(0, 7), moreNavItem, ...mainNavItems.slice(7)]

  return (
    <div className={wrapperClass}>
      <div className={innerWrapperClass}>
        {visibleNavItems.map(({ name, path, icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => {
              return mergeClasses({
                'mt-3': !isTabletOrMobile,
                'text-[10px]': true,
                'text-nowrap': true,
                'border-l-2': isActive && !isTabletOrMobile,
                'border-b-2': isActive && isTabletOrMobile,
                'border-[#5B5FC7]': isActive,
                'hover:text-gray-300': !isActive,
                'w-full': isActive,
              })
            }}
          >
            <div className='flex flex-col items-center gap-2'>
              <span>{icon}</span>
              <span className='text-[#673333]'>{name}</span>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Navbar
