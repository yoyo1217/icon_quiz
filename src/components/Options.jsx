import React from 'react'

export default function Options({ options, correctOption, dispatch, answer }) {
  const hasAnswered = answer !== null
  return (
    <div className='options'>
      {options.map(option => (
        <button 
          className={`btn btn-option ${option.title === answer 
            ? "answer" : ""} ${
              hasAnswered
              ? option.title === correctOption
                ? "correct"
                : "wrong"
              : ""
            }`}
          key={option.title}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "SET_NEW_ANSWER", payload: option.title})}
        >
          {option.title}
        </button>
      ))}
    </div>
  )
}
