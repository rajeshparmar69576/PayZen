import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

const AppBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/')
    }
  return (
    <div className='shadow h-16 flex justify-between items-center px-6 bg-white'>
        <div className='text-2xl font-semibold text-blue-600'>PayZen App</div>

        <div className='flex items-center space-x-6'>
            <Link to="/home" className='text-lg hover:text-blue-500'>
                Home
            </Link>
            <Link to="/dashboard" className='text-lg hover:text-blue-500'>
                Dashboard
            </Link>

            <button
                onClick={handleLogout}
                className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'  
            >
                Logout
            </button>
        </div>
    </div>
  )
}

export default AppBar