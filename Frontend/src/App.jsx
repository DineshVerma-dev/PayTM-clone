import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Dashboard } from './pages/Dashboard'
import { SendMoney } from './pages/SendMoney';
import {Home} from './pages/Home';
export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </Router>
    </>

  )
}
