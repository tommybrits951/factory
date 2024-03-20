import { useState, useContext } from 'react'
import axios from "axios";
import { Factory } from '../../App';

const initForm = {
    first_name: "",
    last_name: "",
    gender: "Private",
    dob:  "",
    phone: "",
    email: "",
    username: "",
    password: "",
    role: "Employee"
}



export default function Register() {
  const [formData, setFormData] = useState(initForm)
  const {token, role} = useContext(Factory)

    function change(e) {
      const {name, value} = e.target
      return setFormData({...formData, [name]: value}) 
    }
    
    
    function submit(e) {
      e.preventDefault()
      const user = {...formData}
      axios.post("http://localhost:9000/user", user, {
        withCredentials: true,
        baseURL: "http://localhost:9000"
      })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => console.error(err))
    }
    
    
    function clear() {
      return setFormData(initForm)
    }


  return (
    <section className='absolute w-full pt-16'>
      {role !== "Employee" ? 
      <form onSubmit={submit} className='relative text-center border-2 rounded-xl bg-stone-900 left-1/4 w-2/4'>
      <h2 className='text-white text-4xl underline m-1'>New Employee</h2>
        <h3 className='text-white text-lg mt-1 font-mono '>First Name</h3>
        <input className='text-lg px-1 rounded-lg' type='text' name='first_name' value={formData.first_name} onChange={change} required/>
        <h3 className='text-white text-lg mt-1 font-mono '>Last Name</h3>
        <input className='text-lg px-1 rounded-lg' type='text' name='last_name' value={formData.last_name} onChange={change} required/>
        <h3 className='text-white text-lg mt-1 font-mono '>Date of Birth</h3>
        <input className='text-lg px-1 rounded-lg' type='date' name='dob' value={formData.dob} onChange={change} required/>
        <h3 className='text-white text-lg mt-1 font-mono '>Gender</h3>
        <select name='gender' className='text-lg rounded-lg' onChange={change} value={formData.gender} >
          <option value={"Private"}>Private</option>
          <option value={"Male"}>Male</option>
          <option value={"Female"}>Female</option>
        </select>
      <h3 className='text-white text-lg mt-1 font-mono '>Phone</h3>
      <input className='text-lg px-1 rounded-lg' type='number' placeholder='e.g. 5555555555' name='phone' value={formData.phone} onChange={change} required/>
      <h3 className='text-white text-lg mt-1 font-mono '>Email</h3>
      <input className='text-lg px-1 rounded-lg' type='email' name='email' value={formData.email} onChange={change} required/>
      <h3 className='text-white text-lg mt-1 font-mono '>Username</h3>
      <input className='text-lg px-1 rounded-lg' type='text' name='username' value={formData.username} onChange={change} required/>
      <h3 className='text-white text-lg mt-1 font-mono '>Password</h3>
      <input className='text-lg px-1 rounded-lg' type='password' name='password' value={formData.password} onChange={change} required minLength={6} />
      <h3 className='text-white text-lg mt-1 font-mono '>Role</h3>
      <select name='role' value={formData.role} className='text-lg rounded-lg' onChange={change}>
        <option value={"Employee"}>Employee</option>
        <option value={"Manager"}>Manager</option>
        <option value={"Admin"}>Admin</option>
      </select>
      <br />
  <button onClick={clear} className='text-white bg-stone-500 px-2 py-1 rounded-lg m-3'>Clear</button>
  <button type='submit' className='text-white bg-cyan-500 px-2 py-1 rounded-lg m-3'>Submit</button>
      </form>
    : <h2 className='text-6xl underline mt-36 text-red-600 font-serif text-center'>You Are Not Authorized!</h2>}
    </section>
  )
}
