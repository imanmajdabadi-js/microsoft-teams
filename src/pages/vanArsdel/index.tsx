import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout'
import Home from './pages/Home'
import AssignedToMe from './pages/assignedToMe'
import Timeline from './pages/Timeline'
import Decisions from './pages/Decisions'
import WorkstreamPage from './pages/workstreams'
import TaskDetails from './pages/workstreams/taskDetails'
import { WorkspaceProvider } from './context/workspaceContext'
import NotFoundPage from '../notFound'

const VanArsdelPage = () => {
  return (
    <WorkspaceProvider>
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='assigned-to-me' element={<AssignedToMe />} />
          <Route path='timeline' element={<Timeline />} />
          <Route path='decisions' element={<Decisions />} />
          <Route path='chat' element={<Navigate to='/van-arsdel/decisions' replace />} />
          <Route path='workstreams/:workstreamId'>
            <Route index element={<WorkstreamPage />} />
            <Route path='tasks/:taskId' element={<TaskDetails />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </WorkspaceProvider>
  )
}

export default VanArsdelPage
