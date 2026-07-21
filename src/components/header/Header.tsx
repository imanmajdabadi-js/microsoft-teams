import { FC } from 'react'
import { ReactComponent as TeamsIcon } from '../../assets/icons/teams.svg'
import IconElement from '../iconElement/IconElement'

const Header: FC = () => {
  return (
    <header className='h-12 w-full border-b bg-custom-gradient-navbar-header px-5'>
      <div className='flex h-full items-center justify-between gap-4'>
        <div className='flex items-center gap-2'>
          <IconElement icon={TeamsIcon} className='h-7 w-7' />
          <span className='text-sm font-semibold text-[#242424]'>Launch Control</span>
        </div>

        <div className='rounded-full border border-white/60 bg-white/40 px-4 py-1.5 text-xs font-medium text-[#424242]'>
          Van Arsdel workspace
        </div>

        <div className='flex items-center gap-2' aria-label='Current workspace member'>
          <span className='hidden text-xs text-[#424242] xl:inline'>Launch team</span>
          <span
            className='flex h-8 w-8 items-center justify-center rounded-full bg-[#5B5FC7] text-[11px] font-semibold text-white'
            aria-hidden='true'
          >
            LT
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header
