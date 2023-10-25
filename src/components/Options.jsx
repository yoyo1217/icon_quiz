import React from 'react'

export default function Options({ options }) {
  return (
    <div className='options'>
      {options.map(option => (
        <button className='btn btn-option' key={option.title}>{option.title}</button>
      ))}
    </div>
  )
}
