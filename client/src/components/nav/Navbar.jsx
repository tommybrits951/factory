import {useContext} from 'react'
import { Factory } from '../../App'
import {Link} from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'




export default function Navbar() {
  const {menu, openMenu, token, logoutUser} = useContext(Factory)
  const {role} = jwtDecode(token)
  const menuItems = [{name: "Home", path: ''}, {name: "Parts Catalog", path: "parts"}, {name: "Vendors", path: "vend"}, role !== "Employee" ? {name: "New Employee", path: "register"} : null]
  function menuHandle(e) {
    return openMenu(e)
  }
    function logout() {
      return logoutUser()
    }

    return (
    <header className='fixed top-0 p-2 left-0 z-10 w-full bg-black'>
        <button title='open' onClick={menuHandle} className='text-white text-2xl hover:scale-110'>&#9776;</button>
      {menu === false ? null : <ul className='absolute bg-slate-950 text-white p-2 rounded-xl'>
        {menuItems.map((itm, idx) => {
          return(
            <li key={idx} className='m-2 text-xl font-serif underline hover:scale-110'>
              <Link to={`/${itm.path}`}>{itm.name}</Link>
            </li>
          )
        })}
        </ul>}
        <button className='text-white' onClick={logout}>Logout</button>
    </header>
  )
}
