import {useEffect, useContext, useState} from "react"
import axios from "axios"
import VendorForm from "./VendorForm"
import {Link} from "react-router-dom"
import { Factory } from "../../App"




export default function Vendors() {
    const [vendors, setVendors] = useState(null)
    const [openForm, setOpenForm] = useState(false)
    const {role, token} = useContext(Factory)
    


    function formOpen(e) {
        const {title} = e.target
        if (title === "openForm") {
            return setOpenForm(true)
        } else {
            return setOpenForm(false)
        }
    }





    useEffect(() => {
        axios.get("http://localhost:9000/vend", {
            withCredentials: true,
            baseURL: "http://localhost:9000"
        })
        .then(res => {
            setVendors(res.data)
        })
        .catch(err => console.error(err))
        axios.get("http://localhost:9000/auth", {
            withCredentials: true,
            baseURL: "http://localhost:9000",
            headers: {
                Authorization: token 
            }
        })
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.error(err))
    }, [])



    
    return (
        <>
        <section className="absolute h-full w-full">
        {vendors === null ? null : 
            <ul className="absolute h-3/4 overflow-y-scroll w-2/4 left-1/4 top-32 border-2 rounded-xl p-1">
            <li className="text-center border-2 p-3 rounded-xl bg-black text-white">
            <button title="openForm" onClick={formOpen}>
            ++ Add Contact ++
                    </button>
                    </li>
                    {vendors.map((vend, idx) => {
                return (
                    <li key={idx} className="w-full border-2 p-1 bg-black hover:scale-95 rounded-xl">
                        <Link to={`/vend/:${idx}`} className="w-full grid grid-cols-2 text-white">
                        <div className="col-start-1">
                            <h3 className="underline">Company</h3>
                            <p>{vend.name}</p>
                        </div>
                        <div className="col-start-2 text-right">
                            <h3 className="underline">Phone</h3>
                            <p>{vend.phone}</p>
                        </div>
                        </Link>
                    </li>
                )
            })}
        </ul>
        }
        {!openForm ? null : 
          role !== "Employee" ? <VendorForm closeForm={formOpen}/> : null
        }
        </section>
        </>
        )
}
