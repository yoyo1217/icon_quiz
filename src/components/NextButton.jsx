import React from 'react'

export default function NextButton({ dispatch, answer, questionCnt }) {
  if(answer === null) return null
  if(questionCnt < 10){
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: "NEXT_QUESTION"})}
      >
        Next
      </button>
    )
  }

  if(questionCnt >= 10){
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: "FINISH"})}
      >
        Finish
      </button>
    )
  }
}
