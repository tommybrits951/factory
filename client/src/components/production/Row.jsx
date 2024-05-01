import React from 'react'

export default function Row(props) {
  const {machine, menuBtn, num} = props
  function menuHandle(e) {
    menuBtn(e)
  }
  return (
    <div className='mon-row'>
      <div className='cell'>
        <span className='cell-text'>{machine.machine_number}</span>
      </div>
      <div className='cell'>
        <span className='cell-text'>{machine.priority}</span>
      </div>
      <div className='cell'>
        <span className='cell-text'>{machine.job}</span>
      </div>
      <div className='cell'>
        <span className='cell-text'>{machine.part_name}</span>
      </div>
      <div className='cell'>
        <span className='cell-text'></span>
      </div>
      <div className='cell'>
        <span className='cell-text'></span>
      </div>
      <div className='cell'>
        <span className='cell-text'></span>
      </div>
      <div className='cell'>
        <span className='cell-text'></span>
      </div>
      <div className='cell'>
        <span className='cell-text'></span>
      </div>
      <div className='cell'>
        <span className='cell-text'></span>
        <button onClick={menuHandle} value={num} className='rounded-lg text-lg border-2 w-3/6' title='openJobBtn'>+</button>
      </div>
    </div>
  )
}
