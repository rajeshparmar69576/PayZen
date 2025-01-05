import {Routes,Route} from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import SendMoney from './pages/SendMoney'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/send' element={<SendMoney/>}></Route>
      </Routes>
    </>
  )
}

export default App