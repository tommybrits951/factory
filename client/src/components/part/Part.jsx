import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from 'react-router-dom'
export default function Part() {
  const {sku} = useParams()
  const [part, setPart] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:9000/parts/${sku}`)
    .then(res => {
      console.log(res.data)
      setPart(res.data)
    })
    .catch(err => console.error(err))
  }, [])
  
    return (
    <section className="pt-5">
        {part === null ? null : 
        <div className="mt-16 text-center">
          <h2 className="text-white text-6xl">{part.name}</h2>
          </div>}
    </section>
  )
}
