import Part from './components/part/Part'
import { useState, createContext, useEffect } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Vendors from './components/vend/Vendors'
import Vendor from './components/vend/Vendor'
import Parts from './components/part/Parts'
import Navbar from './components/nav/Navbar'
import Login from './components/user/Login'
import Register from "./components/user/Register"
import Home from './components/Home'
import axios from "axios"
import { jwtDecode } from 'jwt-decode'


export const Factory = createContext()
const provinceList = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"]

const initToken = {
  first_name: null,
  last_name: null,
  role: null
}
function App() {
  const [menu, setMenu] = useState(false)
  const [token, setToken] = useState(null)
  const [decodedToken, setDecodedToken] = useState(initToken)
  function assignToken(token) {
    const {first_name, last_name, role} = jwtDecode(token)
    setDecodedToken({first_name, last_name, role})
    return setToken(token)
  }

  function openMenu(e) {
    const {title} = e.target
    if (title === "open") {
      return setMenu(true)
    } else {
      return setMenu(false)
    }
  }



  function checkLogin() {
      axios.get("http://localhost:9000/auth", {
        withCredentials: true,
        baseURL: "http://localhost:9000",
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        
        setToken(res.data)
      })
      .catch(err => console.error(err))
    
  }
useEffect(() => {
  axios.get("http://localhost:9000/auth", {
    withCredentials: true,
    baseURL: "http://localhost:9000"
  })
  .then(res => {
    setToken(res.data)
  })
  .catch(err => console.log(err))
}, [])
  return (
    <main onClick={openMenu} className='absolute h-full w-full bg-slate-700'>
            <Factory.Provider value={{
              menu,
              openMenu,
              role: decodedToken.role,
              assignToken,
              token,
              provinceList,
            }}>

            {token === null ? 
            <Routes>
              <Route element={<Login />} path='/*' />
            </Routes>
            :
            <>
            <Navbar />
            <Routes>
              <Route element={<Home />} path='/' />
              <Route element={<Register />} path='/register' />
              <Route element={<Parts />} path='/parts' />
              <Route element={<Part />} path='/parts/:sku' />
              <Route element={<Vendors />} path='/vend' />
              <Route element={<Vendor />} path='/vend/:id' />
            </Routes> 
            </>
            }
            </Factory.Provider>
    </main>
  )
}

export default App
