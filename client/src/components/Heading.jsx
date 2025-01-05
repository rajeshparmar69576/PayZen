import React from 'react'

const Heading = ({label}) => {
  return (
    <div className='flex pt-6 font-bold text-4xl justify-center'>
      {label}
    </div>
  )
}

export default Heading