import {useState} from 'react'
import axios from 'axios';

const initForm = {
    name: "",
    cavities: "",
    cycle_time: "",
    materials: [],
    material: "",
    weight: "",
    description: ""
}



export default function PartForm(props) {
    const [formData, setFormData] = useState(initForm)
    const {openForm} = props


    function openHandle(e) {
        e.preventDefault()
        return openForm(e)
    }
    function clear() {
        e.preventDefault()
        return setFormData(initForm)
    }
    function change(e) {
        const {name, value} = e.target;
        return setFormData({...formData, [name]: value})
    }
    function addMaterial(e) {
        e.preventDefault()
        const {material} = formData;
        setFormData({...formData, materials: [...formData.materials, material], material: ""})

    }
    function submit(e) {
        e.preventDefault()
        const newPart = formData
        axios.post("http://localhost:9000/parts", newPart, {
            withCredentials: true,
            baseURL: "http://localhost:9000"
        })
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.error(err))
    }
    return (
    <form className='absolute top-20 bg-black p-3 rounded-xl shadow-xl left-1/4 text-center' onSubmit={submit}>
        <h2 className='text-white text-4xl text-center font-mono'>New Part</h2>
        <button onClick={openHandle} title='closeForm' className='absolute top-3 right-2 px-2 py-1 rounded-lg text-white bg-red-600'>X</button>
        <h3 className='text-white my-2 text-center'>Name</h3>
        <input type='text' onChange={change} name='name' value={formData.name} required /> 
        <h3 className='text-white my-2 text-center'>Cavities</h3>
        <input type='number' onChange={change} name='cavities' value={formData.cavities} required /> 
        <h3 className='text-white my-2 text-center'>Cycle Time</h3>
        <input type='number' placeholder='in seconds' onChange={change} name='cycle_time' value={formData.cycle_time} required /> 
        <div>
        <h3 className='text-white my-2 text-center'>Materials</h3>
            <input type='text' name='material' value={formData.material} onChange={change} />
            <button onClick={addMaterial} className='text-red-500 bg-stone-600 p-2 m-1'>Add</button>
        </div>
        <h3 className='text-white my-2 text-center'>Weight</h3>
        <input type='number' placeholder='ounces' onChange={change} name='weight' value={formData.weight} required /> 
        <h3 className='text-white my-2 text-center'>Description</h3>
        <textarea onChange={change} name='description' value={formData.description} />
        <br />
        <button className='text-white px-2 py-1 bg-stone-600 m-2' onClick={clear} type='reset'>Clear</button>
        <button className='text-white px-2 py-1 bg-cyan-600 m-2' type="submit">Submit</button>
    </form>
  )
}
