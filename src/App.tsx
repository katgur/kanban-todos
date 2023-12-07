import MainPage from './pages/MainPage'
import TaskPage from './pages/TaskPage'
import FullPage from './pages/FullPage'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Routes>
        <Route path='/' element={<MainPage />}>
          <Route path='create' element={<TaskPage />} />
        </Route>
        <Route path='/edit/:id' element={<TaskPage />} />
        <Route path='/full/:id' element={<FullPage />} />
      </Routes>
    </DndProvider>
  )
}

export default App