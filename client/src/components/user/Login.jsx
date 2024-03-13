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
    axios.post("http://localhost:9000/auth", formData, {
      withCredentials: true,
      baseURL: "http://localhost:9000"
    })
    .then(res => {
      console.log(res.data.accessToken)
      assignToken(res.data.accessToken)    
    })
    .catch(err => console.error(err))
  }
    return (
    <section>
        <h2>Employee Login</h2>
        <form onSubmit={submit}>
            <h3>Username</h3>
            <input type='text' name='username' value={formData.username} onChange={change} required />
            <h3>Password</h3>
            <input type="password" name='password' value={formData.password} onChange={change} required />
            <br />
            <button type='submit'>Submit</button>
        </form>
    </section>
  )
}
