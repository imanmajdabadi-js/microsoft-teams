import { Navigate, Route, Routes } from 'react-router-dom'
import VanArdselPage from './pages/vanArdsel'
import MainLayout from './components/mainLayout'
import NotFoundPage from './pages/notFound'

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<Navigate to='/van-ardsel/home' replace />} />
        <Route path='/van-ardsel/*' element={<VanArdselPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  )
}

export default App
