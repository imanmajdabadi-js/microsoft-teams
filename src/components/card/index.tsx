import { FC } from 'react'
import IconElement from '../iconElement/IconElement'
import { More } from 'iconsax-react'

interface CardProps {
  title: string
  description: string
  timePeriods?: {
    period1: string
    period2: string
    period3: string
  }
  imageUrl: string
  label1?: string
  label2?: string
}

const Card: FC<CardProps> = ({ title, description, timePeriods, imageUrl, label1, label2 }) => {
  return (
    <div className='flex-1 cursor-pointer bg-white border border-gray-200 rounded-lg shadow-md'>
      <div className='p-4'>
        <div className='flex justify-between items-center'>
          <p className='text-sm font-bold text-[#242424]'>{title}</p>
          <IconElement icon={More} className='text-[#424242] w-5 h-5' />
        </div>
        <p className='text-[#616161] font-normal text-xs mt-1'>{description}</p>
        <div className='flex gap-x-4  items-center ml-5'>
          <p className='text-[#242424] border-b-2 text-sm border-[#5B5FC7]'>
            {timePeriods?.period1 || <span className='mt-4 block' aria-hidden='true' />}
          </p>
          <p className='text-[#424242] text-sm'>{timePeriods?.period2 || ''}</p>
          <p className='text-[#424242] text-sm'>{timePeriods?.period3 || ''}</p>
        </div>
        <div className='w-full flex justify-center items-center'>
          <img className='' src={imageUrl} alt='card-img' />
        </div>
        <div className='flex items-center gap-x-2 justify-center'>
          <span className='bg-[#00B7C3] text-blue-800 text-xs font-medium w-2.5 h-2.5 '></span>
          <p className='text-xs text-[#424242]'>{label1}</p>
          <span className='bg-[#D1D1D1] text-xs font-medium w-2.5 h-2.5'></span>
          <p className='text-xs text-[#424242]'>{label2}</p>
        </div>
        <div className='mt-16'>
          <button className='text-[#5B5FC7] flex font-medium rounded-lg text-sm px-5 text-center pb-4'>
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
