import {Link} from 'react-router-dom'

const BottomWarning = ({to,label,toText}) => {
  return (
    <div className='py-2 text-sm flex justify-center'>
        <div>
            {label}
        </div>
        <Link className='pl-1 pointer underline cursor-pointer' to={to}>
            {toText}
        </Link>
    </div>
  )
}

export default BottomWarning