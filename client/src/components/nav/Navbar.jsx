import {useContext} from 'react'
import { Factory } from '../../App'
import {Link} from 'react-router-dom'


const menuItems = [{name: "Home", path: 'home'}, {name: "New Employee", path: "register"}]


export default function Navbar() {
    const {menu, openMenu} = useContext(Factory)

    
  function menuHandle(e) {
    return openMenu(e)
  }

    return (
    <header className='fixed top-0 left-0 z-10 w-full bg-black'>
        <button title='open' onClick={menuHandle} className='text-white text-2xl'>&#9776;</button>
      {menu === false ? null : <ul className='absolute bg-slate-950 text-white p-2 rounded-xl'>
        {menuItems.map((itm, idx) => {
          return(
            <li key={idx} className='m-2 text-xl font-mono underline hover:scale-110'>
              <Link to={`/${itm.path}`}>{itm.name}</Link>
            </li>
          )
        })}
        </ul>}
    </header>
  )
}
