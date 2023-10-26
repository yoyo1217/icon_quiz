import React from 'react'

export default function Point({ points }) {
  return (
    <h2>SCORE: <span key={points} className='pointEffect'>{points}</span></h2>
  )
}
