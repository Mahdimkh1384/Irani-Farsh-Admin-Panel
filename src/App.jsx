import './App.css'
import Sidebar from './Components/Sidebar/Sidebar'
import Header from './Components/Header/Header'
import routes from '../Routes'
import { useRoutes } from 'react-router-dom'

function App() {

  const router = useRoutes(routes)

  return (
    <>
      <div>
        <Sidebar />
        <div className='mr-[370px] ml-16'>
          <Header />
          {router}
        </div>
      </div>
    </>
  )
}

export default App
