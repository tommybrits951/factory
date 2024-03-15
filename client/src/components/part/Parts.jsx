import axios from "axios"
import { useState, useEffect, useContext} from 'react'
import { Link } from "react-router-dom"
import { Factory } from "../../App"
import PartForm from "./PartForm"
export default function Parts() {
    const [parts, setParts] = useState(null)
    const [openForm, setOpenForm] = useState(false)
    function addPart(e) {
        const {title} = e.target
        if (title === "openForm") {
            return setOpenForm(true)
        } else if (title === "closeForm") {
            return setOpenForm(false)
        }
    }
    
    
    useEffect(() => {
        axios.get("http://localhost:9000/parts").then(res => {
            setParts(res.data)
        })
        .catch(err => console.error(err))
    }, [])
    
    useEffect(() => {
        axios.get("http://localhost:9000/parts").then(res => {
            setParts(res.data)
        })
        .catch(err => console.error(err))
    }, [openForm])
    return (
    <section className="absolute h-full w-full p-5 pt-16">
        <ul className="relative border-2 w-1/2 h-3/4 rounded-xl p-1 top-16 left-1/4 overflow-y-scroll">
            <li className="w-full border-2 rounded-xl p-1"><button className="text-white w-full py-3 hover:scale-95 rounded bg-black" title="openForm" onClick={addPart}>+ Add Part +</button></li>
            {parts === null ? null : 
            parts.map((part, idx) => {
                return (
                    <li className="border-2 bg-black p-2 hover:scale-95 rounded-xl m-1" key={idx}>
                        <Link to={`/parts/${part.sku}`} className="grid grid-cols-">
                            <div className="col-start-1">

                        <h3 className="text-red-600">Part Name</h3>
                        <p className="text-white">{part.name}</p>
                            </div>
                            <div className="col-start-2 absolute right-5">
                        <h3 className="text-red-600">Part #</h3>
                        <p className="text-white">{part.sku}</p>
                            </div>
                        </Link>
                    </li>
                )
            })
            }
        </ul>
        {openForm === false ? null : 
        <PartForm openForm={addPart}/>
        }
    </section>
  )
}
