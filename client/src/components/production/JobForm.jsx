import {useState, useContext} from 'react'
import { Factory } from '../../App'

const initForm = {
  job: "",
  part_number: "",
  amount: ""
}
function JobForm(props) {
  const {num} = props
  const {partsList} = useContext(Factory)
  const [formData, setFormData] = useState(initForm)
  
  function change(e) {
    const {name, value} = e.target
    return setFormData({...formData, [name]: value})
  }
  function submit(e) {
    e.preventDefault()
  }
  return (
    <form onSubmit={submit} className='absolute bg-rose-700 top-20 left-36'>
      <h3>Machine #: {num}</h3>
      <h3>Job Number</h3>
      <input type='text' onChange={change} name='job' value={formData.job} required />
      <h3>Part Number</h3>
      <select>
        
      </select>
    </form>
  )
}

export default JobForm