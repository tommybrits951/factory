import {useState} from 'react'
import axios  from 'axios'
export default function ImageUpload() {
  const [image, setImage] = useState("")
  /* function convertBase64(file) {
    return new Promise((res, rej) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      
      reader.onload = () => {
        res(reader.result)
      }
      reader.onerror = (err) => {
        console.log(err)
      }
    })
  } */
  async function change(e) {
   let {files} = e.target
   files = files[0]
    setImage(files)
  }
  function submit(e) {
    e.preventDefault()
    const formData = new FormData()
    
    formData.append('image', image)
    console.log(image)
    console.log(formData)
    axios.post("http://localhost:9000/image", formData, {
      withCredentials: true,
      baseURL: "http://localhost:9000"
    })
    .then(res => {
      console.log(res.data)
    })
    .catch(err => console.log(err))
  }
  return (
    <form method='POST' action='/upload' encType='multipart/form-data' name={`form_data`} onSubmit={submit}>
      <h3 className='text-white text-4xl text-center'>Upload Images</h3>
      <input type='file' name='img' accept='image/*' form='form-data' className='rounded text-lg p-1' onChange={change}/>
      <button type='submit' className='bg-green-500 rounded-xl text-white p-1'>Submit</button>
    </form>
  )
}
