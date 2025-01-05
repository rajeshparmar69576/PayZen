import React from 'react'

const InputBox = ({label,placeholder,type,onChange}) => {
  return (
    <div>
        <div className='font-medium text-sm text-left py-2'>{label}
        </div>
        <input onChange={onChange} type={type}  className=' w-full px-2 py-1 border rounded border-slate-200 '  placeholder={placeholder}/>
    </div>
  )
}

export default InputBox