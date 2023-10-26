import React, { useEffect } from 'react'
import SVGIcon from './SVGIcon'
import Options from './Options'


export default function Question({ question, options, correctOption, dispatch, answer }) {
  useEffect(() => {
    dispatch({ type: 'PICK_QUESTION_ICON' })
    dispatch({ type: 'GET_OPTIONS' })
  }, [dispatch])

  useEffect(() => {
    console.log(question);
  })

  return (
    <div>
      {question && <SVGIcon svg={question.svg} className="largeIcon" />}
      <Options options={options} correctOption={correctOption} dispatch={dispatch} answer={answer}/>
    </div>
  )
}

