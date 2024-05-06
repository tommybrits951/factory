import ImageUpload from './components/user/ImageUpload'
import Part from './components/part/Part'
import { useState, createContext, useEffect } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Vendors from './components/vend/Vendors'
import Vendor from './components/vend/Vendor'
import NotAuthorized from './components/nav/NotAuthorized'
import Parts from './components/part/Parts'
import Navbar from './components/nav/Navbar'
import Login from './components/user/Login'
import Register from "./components/user/Register"
import Home from './components/Home'
import axios from "axios"
import {jwtDecode} from 'jwt-decode'
import Monitor from './components/production/Monitor'

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
  const [vendorsList, setVendorsList] = useState(null)
  const [partsList, setPartsList] = useState(null)
  function getPartsList() {
    axios.get("http://localhost:9000/parts", {
      withCredentials: true,
      baseURL: "http://localhost:9000"
    })
    .then(res => {
      setPartsList(res.data)
    })
    .catch(err => console.log(err))
  }



  function assignToken(token) {
    const {first_name, last_name, role_id} = jwtDecode(token)
    setDecodedToken({first_name, last_name, role_id})
    return setToken(token)
  }


function logoutUser() {
  axios.get("http://localhost:9000/auth/logout", {
    withCredentials: true,
    baseURL: "http://localhost:9000"
  })
  .then(res => {
    console.log(res.data)
    setToken(res.data.token)
  })
  .catch(err => console.log(err))
}
  function openMenu(e) {
    const {title} = e.target
    if (title === "open") {
      return setMenu(true)
    } else {
      return setMenu(false)
    }
  }




useEffect(() => {
    axios.get("http://localhost:9000/auth/check", {
      withCredentials: true,
      baseURL: "http://localhost:9000"
    })
    .then(res => {
      setToken({
        token: res.data,
        decoded: token,
      })
    })
    .catch(err => console.log(err))
 
     getPartsList() 
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
              logoutUser,
              partsList
            }}>
            {
  token === null ? 
              <Routes>
              <Route element={<Login />} path='/*' />
            </Routes>
            :
            
        <div>
            <Navbar />
            <Routes>
              <Route element={<Monitor />} path='/' />
              {decodedToken.role_id === 3 ? <Route element={<Register />} path='/register' /> : <Route element={<NotAuthorized />} path='/register' />}
              <Route element={<Parts />} path='/parts' />
              <Route element={<Part />} path='/parts/:sku' />
            </Routes> 
            </div>
            
            }
            </Factory.Provider>
    </main>
  )
}

export default App
