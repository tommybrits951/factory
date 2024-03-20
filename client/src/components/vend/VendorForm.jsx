import { useState, useContext } from 'react'
import axios from 'axios'
import { Factory } from '../../App'
const initForm = {
    name: "",
    street: "",
    city: "",
    province: "",
    postal: "",
    phone: "",
    email: "",
    product: "Material",
    date_added: new Date()
}

export default function VendorForm(props) {
    const { provinceList, token } = useContext(Factory)
    const [formData, setFormData] = useState(initForm)
    const [errors, setErrors] = useState('')
    const { closeForm } = props
    const {accessToken} = token
    function change(e) {
        const { name, value } = e.target
        return setFormData({ ...formData, [name]: value })
    }



    function clearErrors() {
        return setErrors("")
    }



    function submit(e) {
        e.preventDefault()
        const vend = formData
        axios.post("http://localhost:9000/vend", vend, {
            withCredentials: true,
            baseURL: "http://localhost:9000",
            headers: {
                Authorization: accessToken 
            }
        })
        .then(res => {
            clear()
            closeHandle({title: "Closed"})
            console.log(res.data)
        } 
            )
        .catch(err => console.log(err))
    }
    function clear() {
        return setFormData(initForm)
    }
    function closeHandle(e) {
        return closeForm(e)
    }
    return (
        <section className='absolute h-6/8 w-2/4 rounded-3xl border-2 left-1/4 top-32 text-center bg-black'>
            <h2 className='text-white font-mono text-5xl mt-1 underline'>Add Contact</h2>
            <button onClick={closeHandle} title='closeForm' className='absolute right-3 top-3 rounded px-2 py-1 bg-red-500'>X</button>
            <form onSubmit={submit}>
                <h3 className='text-white mt-3'>Company Name</h3>
                <input type='text' name='name' value={formData.name} onChange={change} required />
                <h3 className='text-white mt-3'>Street Address</h3>
                <input type='text' name='street' value={formData.street} onChange={change} required />
                <h3 className='text-white mt-3'>City</h3>
                <input type='text' name='city' value={formData.city} onChange={change} required />
                <h3 className='text-white mt-3'>State/Province</h3>
                <select name='province' onChange={change}>
                    {provinceList.map((prov, idx) => {
                        return <option key={idx} value={prov}>{prov}</option>
                    })}
                </select>
                <h3 className='text-white mt-3'>Postal/Zip Code</h3>
                <input type='number' minLength={5} maxLength={5} name='postal' value={formData.postal} onChange={change} required />
                <h3 className='text-white mt-3'>Phone Number</h3>
                <input type='number' minLength={10} maxLength={10} name='phone' value={formData.phone} onChange={change} required placeholder='example 5555555555' />
                <h3 className='text-white mt-3'>Email</h3>
                <input type='email' name='email' value={formData.email} onChange={change} required />
                <h3 className='text-white mt-3'>Product Supplied</h3>
                <input type='text' name='product' value={formData.product} onChange={change} required />
                <br />
                <button className='mt-5 bg-rose-600 mx-1 text-white px-2 py-1 rounded' onClick={clear}>Clear</button>
                <button type='submit' className='bg-cyan-600 mx-1 text-white px-2 py-1 rounded'>Submit</button>
            </form>
        </section>
    )
}
