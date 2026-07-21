import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import VanArsdelPage from './pages/vanArsdel'
import MainLayout from './components/mainLayout'
import NotFoundPage from './pages/notFound'

const LegacyVanArsdelRedirect = () => {
  const { pathname, search, hash } = useLocation()
  const correctedPath = pathname.replace('/van-ardsel', '/van-arsdel')

  return <Navigate to={`${correctedPath}${search}${hash}`} replace />
}

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<Navigate to='/van-arsdel/home' replace />} />
        <Route path='/van-arsdel/*' element={<VanArsdelPage />} />
        <Route path='/van-ardsel/*' element={<LegacyVanArsdelRedirect />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  )
}

export default App
