import {useState, useEffect} from 'react'
import Row from "./Row"
import "./Monitor.css"
import machs from "./machObject"
import JobForm from './JobForm'
export default function Monitor() {
  const [machines, setMachines] = useState(machs)
  const [jobMenu, setJobMenu] = useState(false)
  function addJob(num) {
    const {value} = e.target
    let mach = {...machines[value]}
  }
  function openJobMenu(e) {
    const {title, value} = e.target
    if (title === "openJobBtn") {
      setJobMenu(true)
    } else {
      setJobMenu(false)
    }
  }
  useEffect(() => {
    console.log(machines)
  }, [])
  return (
    <section  className='h-full w-full bg-slate-600' onClick={openJobMenu}>
      <div className='monitor'>
        <div className='mon-row'>
          <div className='cell'>#</div>
          <div className='cell'>!</div>
          <div className='cell'>Job</div>
          <div className='cell'>Part</div>
          <div className='cell'>Num</div>
          <div className='cell'>Amnt</div>
          <div className='cell'>Time</div>
          <div className='cell'>Mat</div>
          <div className='cell'>Lot</div>
          <div className='cell'>Status</div>
        </div>
        {machines.map((mac, idx) => {
          return <Row machine={mac} key={idx} num={idx} menuBtn={openJobMenu}/>
        })}
      </div>
      {jobMenu === true ? <JobForm />: null}
    </section>
  )
}
