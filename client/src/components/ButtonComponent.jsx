import React from 'react'

const ButtonComponent = ({label,onClick}) => {
  return (
  <button onClick={onClick} className='bg-gray-800 text-white w-full hover:bg-gray-900 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2'
  >{label}

  </button>

  )
}

export default ButtonComponent