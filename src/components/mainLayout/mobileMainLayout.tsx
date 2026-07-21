import { FC, PropsWithChildren } from 'react'

const MobileMainLayout: FC<PropsWithChildren> = ({ children }) => {
  return <main className='w-full'>{children}</main>
}

export default MobileMainLayout
