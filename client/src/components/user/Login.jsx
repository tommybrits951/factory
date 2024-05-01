import {useState, useContext} from 'react'
import axios from 'axios'
import {Factory} from "../../App" 

const initForm = {
    username: "",
    password: ""
}


export default function Login() {
  const [formData, setFormData] = useState(initForm)
  const {assignToken} = useContext(Factory)


  function change(e) {
    const {name, value} = e.target
    return setFormData({...formData, [name]: value})
  }
  function submit(e) {
    e.preventDefault()
    const user = {...formData, username: parseInt(formData.username)}
    axios.post("http://localhost:9000/auth", user, {
      withCredentials: true,
      baseURL: "http://localhost:9000"
    })
    .then(res => {
      assignToken(res.data.accessToken)    
    })
    .catch(err => console.error(err))
  }
    return (
    <section className='absolute shadow-2xl w-3/6 h-2/4 left-1/4 pt-20 bg-black rounded-lg'>
        <h2 className='text-4xl font-mono text-center text-white underline'>Employee Login</h2>
        <form onSubmit={submit} className='bg-black text-center p-2'>
            <h3 className='text-white text-center m-2'>Username</h3>
            <input className='text-lg rounded-lg p-1' type='text' name='username' value={formData.username} onChange={change} required />
            <h3 className='text-white text-center m-2'>Password</h3>
            <input className='text-lg rounded-lg p-1' type="password" name='password' value={formData.password} onChange={change} required />
            <br />
            <button type='submit' className='bg-cyan-500 text-white mt-5 p-2 rounded'>Submit</button>
        </form>
    </section>
  )
}
