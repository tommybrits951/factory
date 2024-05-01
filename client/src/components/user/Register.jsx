import { useState, useContext } from 'react'
import axios from 'axios'
import { Factory } from '../../App'

const initForm = {
  first_name: '',
  last_name: '',
  gender: '',
  dob: '',
  user_phone: '',
  user_street: '',
  user_city: '',
  user_province: '',
  user_postal: '',
  role_id: '',
  password: ''
}
const provinces = ['AL','AK','AZ','AR','CA','CZ','CO','CT','DE','DC','FL','GA','GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','PR','RI','SC','SD','TN','TX','UT','VT','VI','VA','WA','WV','WI','WY']//eslint-ingore-line

export default function Register () {
  const [formData, setFormData] = useState(initForm)
  const [page, setPage] = useState(1)
  const { token, role } = useContext(Factory)

  function change (e) {
    const { name, value } = e.target
    return setFormData({ ...formData, [name]: value })
  }

  function turnPage(e) {
    e.preventDefault()
    const {title} = e.target
    if (title === "next" && page < 3) {
      return setPage(page + 1)
    } else if (title === "back" && page > 0) {
      return setPage(page - 1)
    }
  }

  function submit (e) {
    e.preventDefault()
   const user = {...formData}
    axios
      .post('http://localhost:9000/users', user, {
        withCredentials: true,
        baseURL: 'http://localhost:9000'
      })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => console.error(err))
  }

  function clear () {
    return setFormData(initForm)
  }

  return (
    <section className='absolute w-full pt-16'>
      <form
        onSubmit={submit}
        className='relative text-center border-2 rounded-xl bg-stone-900 left-1/4 w-2/4'
      >
        <h2 className='text-white text-4xl underline m-1'>New Employee</h2>
        {page === 1 ? 
        <div>
          <h3 className='text-white text-lg mt-1 font-mono '>First Name</h3>
          <input
            className='text-lg px-1 rounded-lg'
            type='text'
            name='first_name'
            value={formData.first_name}
            onChange={change}
            required
            />
          <h3 className='text-white text-lg mt-1 font-mono '>Last Name</h3>
          <input
            className='text-lg px-1 rounded-lg'
            type='text'
            name='last_name'
            value={formData.last_name}
            onChange={change}
            required
            />
          <h3 className='text-white text-lg mt-1 font-mono '>Date of Birth</h3>
          <input
            className='text-lg px-1 rounded-lg'
            type='date'
            name='dob'
            value={formData.dob}
            onChange={change}
            required
            />
          <h3 className='text-white text-lg mt-1 font-mono '>Gender</h3>
          <select
            name='gender'
            className='text-lg rounded-lg'
            onChange={change}
            >
            <option value={'Private'}>Private</option>
            <option value={'Male'}>Male</option>
            <option value={'Female'}>Female</option>
          </select>
          <br />
          <button onClick={clear} className='text-white bg-red-500 rounded-xl my-2 mx-3 p-2'>Clear</button>
          <button title='next' onClick={turnPage} className='text-white bg-cyan-500 rounded-xl my-2 mx-3 p-2'>Next</button>
        </div>
: page === 2 ?
<div>
          <h3 className='text-white text-lg mt-1 font-mono '>Phone</h3>
          <input
            className='text-lg px-1 rounded-lg'
            type='number'
            placeholder='e.g. 5555555555'
            name='user_phone'
            value={formData.phone}
            onChange={change}
            required
            />
          <h3 className='text-white text-lg mt-1 font-mono '>Street Adress</h3>
          <input
            className='text-lg px-1 rounded-lg'
            type='text'
            name='user_street'
            value={formData.user_street}
            onChange={change}
            required
            minLength={6}
            />
          <h3 className='text-white text-lg mt-1 font-mono '>City</h3>
          <input
            className='text-lg px-1 rounded-lg'
            type='text'
            name='user_city'
            value={formData.user_city}
            onChange={change}
            required
            minLength={6}
            />
          <h3 className='text-white text-lg mt-1 font-mono '>State/Province</h3>
          <select name='user_province' onChange={change} required>
            {provinces.map((pr, idx) => {
              return (
                <option key={idx} value={pr}>
                  {pr}
                </option>
              )
            })}
          </select>
          <h3 className='text-white text-lg mt-1 font-mono '>
            Postal/Zip Code
          </h3>
          <input
            className='text-lg px-1 rounded-lg'
            type='number'
            name='user_postal'
            value={formData.user_postal}
            onChange={change}
            required
            />
            <br />
<button title='back' className='text-white bg-red-500 rounded-xl my-2 mx-3 p-2' onClick={turnPage}>Back</button>
<button title='next' className='text-white bg-cyan-500 rounded-xl my-2 mx-3 p-2' onClick={turnPage}>Next</button>
        </div> :
        <div>
          <h3 className='text-white text-lg mt-1 font-mono '>Role</h3>
          <select
            name='role_id'
            value={formData.role_id}
            className='text-lg rounded-lg'
            onChange={change}
            >
            <option value={1}>Employee</option>
            <option value={2}>Manager</option>
            <option value={3}>Supervisor</option>
            <option value={4}>Admin</option>
          </select>
          <h3 className='text-white text-lg mt-1 font-mono '>Password</h3>
          <input
            className='text-lg px-1 rounded-lg'
            type='password'
            name='password'
            value={formData.password}
            onChange={change}
            required
            minLength={6}
            />
        <br />
        
        <button
        onClick={turnPage}
        className='text-white bg-stone-500 px-2 py-1 rounded-lg m-3'
        title='back'
        >
  Back
        </button>
        <button
        type='submit'
        className='text-white bg-cyan-500 px-2 py-1 rounded-lg m-3'
        >
          Submit
        </button>
          </div>
        }
      </form>
      </section>
    )
  }
  