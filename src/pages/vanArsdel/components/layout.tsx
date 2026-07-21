import { FC, PropsWithChildren } from 'react'
import MobileLayout from './mobileLayout'
import DesktopLayout from './desktopLayout'
import useDevice from '@/hooks/useDevice'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { isTabletOrMobile } = useDevice()
  return (
    <>
      {isTabletOrMobile && <MobileLayout>{children}</MobileLayout>}
      {!isTabletOrMobile && <DesktopLayout>{children}</DesktopLayout>}
    </>
  )
}

export default Layout
