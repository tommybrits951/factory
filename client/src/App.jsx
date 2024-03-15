import Part from './components/part/Part'
import { useState, createContext, useEffect } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Vendors from './components/vend/Vendors'
import Parts from './components/part/Parts'
import Navbar from './components/nav/Navbar'
import Login from './components/user/Login'
import Register from "./components/user/Register"
import Home from './components/Home'
import axios from "axios"


export const Factory = createContext()



function App() {
  const [menu, setMenu] = useState(false)
  const [token, setToken] = useState(null)

  function assignToken(token) {
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
      })
      .then(res => {
        console.log(res.data)
        setToken(res.data)
      })
      .catch(err => console.error(err))
    
  }
useEffect(() => {
  
}, [token])
  return (
    <main onClick={openMenu} className='absolute h-full w-full bg-slate-700'>
            <Factory.Provider value={{
              menu,
              openMenu,
              assignToken
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
            </Routes> 
            </>
            }
            </Factory.Provider>
    </main>
  )
}

export default App
