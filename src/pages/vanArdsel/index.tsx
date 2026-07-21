import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout'
import Home from './pages/Home'
import AssignedToMe from './pages/assignedToMe'
import TimeLine from './pages/TimeLine'
import Chat from './pages/Chat'
import WorkstreamPage from './pages/workstreams'
import TaskDetails from './pages/workstreams/taskDetails'

const VanArdselPage = () => {
  return (
    <Layout>
      <Routes>
        <Route index element={<Home />} />
        <Route path='home' element={<Home />} />
        <Route path='assigned-to-me' element={<AssignedToMe />} />
        <Route path='timeline' element={<TimeLine />} />
        <Route path='chat' element={<Chat />} />
        <Route path='workstreams/:workstreamId'>
          <Route index element={<WorkstreamPage />} />
          <Route path='tasks/:taskId' element={<TaskDetails />} />
        </Route>
      </Routes>
    </Layout>
  )
}

export default VanArdselPage
