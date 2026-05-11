
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Landing/Navbar'

type c ={
  children: React.ReactNode
}

export const LandingLayout = () => {
  return (
    <div className='p-4 md:p-8 mx-auto min-h-screen container'>
      <Navbar />
      <Outlet />
    </div>
  )
}
