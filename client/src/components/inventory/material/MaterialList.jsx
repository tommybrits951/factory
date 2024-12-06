import { useState, useEffect } from "react"
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons"
import { faEdit } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export default function MaterialList({ materials }) {
  const [tab, setTab] = useState(0)
  const [totalWeights, setTotalWeights] = useState([])


  function pullMaterial(idx, idz) {
    let mat = { ...materials[idx] }
    let id = materials[idx]._id
    let tmp = mat.stock.splice(0, 1)
    console.log(mat.stock, tmp)
    let arr = []
    tmp.map((stk, ind) => {
      if (parseInt(ind) !== parseInt(idz)) {
        arr = [...arr, stk]
      }
    })
    
    axios.patch("http://localhost:9000/mat")
  }
  function openTab(e) {
    const { value } = e.target

    if (parseInt(value) === parseInt(tab)) {
      return setTab(0)
    } else {
      setTab(parseInt(value))
    }
  }
  useEffect(() => {
    let arr = []
    materials.map(mt => {
      let tmp = 0
      mt.stock.map(itm => {
        tmp += parseInt(itm.amount)
      })
      arr = [...arr, tmp]
    })
    setTotalWeights(arr)
  }, [materials])
  return (
    <section className="h-full bg-stone-700 border-2">
      <h3 className="text-center text-3xl border-4 text-white font-mono border-stone-700 rounded-2xl p-2">Materials</h3>
      <ul className="border-4 h-full bg-stone-300 h-full overflow-scroll">
        {materials.length !== 0 ?
          materials.map((material, idx) => {
            return (
              <li key={idx + 1} onClick={openTab}>
                <div className="border-4 grid grid-cols-3 border-stone-500 rounded-lg p-1">
                  <div>
                    <h4 className="text-2xl text-stone-900">Name: {material.materialName}</h4>
                  </div>
                  <div>
                    <h5 className="text-xl text-stone-600">Total: {totalWeights ? totalWeights[idx] : "loading"} LBS.</h5>
                  </div>
                  <div className="flex justify-end">
                    <button><FontAwesomeIcon icon={faEdit} /></button>
                    <button value={parseInt(idx) + 1} className={`${tab === idx + 1 ? "hidden" : "hover:cursor-pointer mx-1 static right-0 w-10 text-center border-stone-700 rounded-lg "}`} onClick={openTab}>
                      &#9668;
                    </button>

                    <button value={parseInt(idx) + 1} className={`${tab !== idx + 1 ? "hidden" : "hover:cursor-pointer mx-1 static right-0 w-10 text-center border-stone-700 rounded-lg "}`} onClick={openTab}>
                      &#9660;
                    </button>
                  </div>
                </div>
                <div className={`${tab === idx + 1 ? null : "hidden"}`}>
                  {material.stock?.length ? material.stock.map((stck, idz) => {
                    return (
                      <div key={idz * 1000} className="flex justify-between border-2 border-stone-500 p-2">
                        <div>
                          <p>Location: {stck.location}</p>
                          <p>Amount: {stck.amount} Lbs.</p>
                          <p>Lot: {stck.lot}</p>
                        </div>
                        <div>
                          <button className="bg-red-500 p-2" onClick={() => pullMaterial(idx, idz)}>-</button>
                        </div>
                      </div>
                    )
                  }) : <p>None in inventory</p>}
                </div>
              </li>
            )
          })
          : null}
      </ul>
    </section>
  )
}
