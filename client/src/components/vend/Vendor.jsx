import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"



export default function Vendor() {
    const {id} = useParams()
    const [vendor, setVendor] = useState(null)
    useEffect(() => {
        console.log(id)
        axios.get(`http://localhost:9000/vend/${id}`, {
            withCredentials: true,
            baseURL: "http://localhost:9000"
        })
        .then(res => setVendor(res.data))
        .catch(err => console.error(err))
    }, [])

    return (
    <section className='absolute h-full w-full'>{vendor.name}</section>
  )
}
