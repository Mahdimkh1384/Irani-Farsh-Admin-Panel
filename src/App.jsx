import './App.css'
import Sidebar from './Components/Sidebar/Sidebar'
import Header from './Components/Header/Header'
import routes from './Routes.jsx'
import { useRoutes } from 'react-router-dom'

function App() {

  const router = useRoutes(routes)

  return (
    <>
      <div>
        <Sidebar />
        <div className='lg:mr-[370px] lg:ml-16 sm:px-2.5 lg:p-0 flex flex-col gap-y-10'>
          <Header />
          {router}
        </div>
      </div>
    </>
  )
}

export default App
