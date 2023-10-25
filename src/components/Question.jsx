import React, { useEffect } from 'react'
import SVGIcon from './SVGIcon'
import Options from './Options'


export default function Question({ question, options,dispatch }) {
  useEffect(() => {
    dispatch({ type: 'PICK_QUESTION_ICON' })
    dispatch({ type: 'GET_OPTIONS' })
  }, [])

  // useEffect(() => {
  //   console.log("question", question);
  //   console.log(options);
  // }, [question, options])

  return (
    // <div className='question-container'>
    <div>
      {question && <SVGIcon svg={question.svg} className="largeIcon" />}
      <Options options={options} />
    </div>
  )
}

