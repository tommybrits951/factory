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
  const {token} = useContext(Factory)

    function change(e) {
      const {name, value} = e.target
      return setFormData({...formData, [name]: value}) 
    }
    
    
    function submit(e) {
      e.preventDefault()
      const user = {...formData}
      axios.post("http://localhost:9000/user", user, {
        withCredentials: true,
        baseURL: "http://localhost:9000",
        headers: {
          authorization: `Bearer`
        }
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
    <section className='absolute'>
      <h2>New Employee</h2>
      <form onSubmit={submit}>
        <h3>First Name</h3>
        <input type='text' name='first_name' value={formData.first_name} onChange={change} required/>
        <h3>Last Name</h3>
        <input type='text' name='last_name' value={formData.last_name} onChange={change} required/>
        <h3>Date of Birth</h3>
        <input type='date' name='dob' value={formData.dob} onChange={change} required/>
        <h3>Gender</h3>
        <select name='gender' onChange={change} value={formData.gender} >
          <option value={"Private"}/>
          <option value={"Male"}/>
          <option value={"Female"}/>
        </select>
      <h3>Phone</h3>
      <input type='number' placeholder='e.g. 5555555555' name='phone' value={formData.phone} onChange={change} required/>
      <h3>Email</h3>
      <input type='email' name='email' value={formData.email} onChange={change} required/>
      <h3>Username</h3>
      <input type='text' name='username' value={formData.username} onChange={change} required/>
      <h3>Password</h3>
      <input type='password' name='password' value={formData.password} onChange={change} required minLength={6} />
      <h3>Role</h3>
      <select name='role' value={formData.role} onChange={change}>
        <option value={"Employee"}>Employee</option>
        <option value={"Manager"}>Manager</option>
        <option value={"Admin"}>Admin</option>
      </select>
      <br />
  <button type='submit'>Submit</button>
  <button onClick={clear}>Clear</button>
      </form>
    </section>
  )
}
