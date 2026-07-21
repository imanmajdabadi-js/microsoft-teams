import { Navigate, Route, Routes } from 'react-router-dom'
import VanArdselPage from './pages/vanArdsel'
import Chat from './pages/chat'
import ActivityPage from './pages/activity'
import TeamsPage from './pages/teams'
import CalendarPage from './pages/calendar'
import CallsPage from './pages/calls'
import FilesPage from './pages/files'
import AppsPage from './pages/apps'
import MainLayout from './components/mainLayout'

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<Navigate to='/van-ardsel/home' replace />} />
        <Route path='/activity' element={<ActivityPage />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/teams' element={<TeamsPage />} />
        <Route path='/calendar' element={<CalendarPage />} />
        <Route path='/calls' element={<CallsPage />} />
        <Route path='/files' element={<FilesPage />} />
        <Route path='/van-ardsel/*' element={<VanArdselPage />} />
        <Route path='/apps' element={<AppsPage />} />
      </Routes>
    </MainLayout>
  )
}

export default App
