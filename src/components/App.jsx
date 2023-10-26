import { useEffect, useReducer } from "react";
import * as icons from 'simple-icons'

import Header from "./Header";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Main from "./Main";
import NextButton from "./NextButton";
import Point from "./Point";
import NumberQuestions from "./NumberQuestions";
import FinishScreen from "./FinishScreen";


const initialState = {
  uniqueIconsArray: [],
  questionIcon: null,
  options: [],
  correctOption: "",
  answer: null,
  points: 0,
  numQuestions: 10,
  questionCnt: 1,
  // error, ready, active, finish
  status: 'ready'
}

function reducer(state, action){
  switch(action.type){
    case 'SET_UNIQUE_ICONS':
      return { ...state, uniqueIconsArray: action.payload }
    case 'PICK_QUESTION_ICON':
      const randomIcon = getRandomIcon(state.uniqueIconsArray)
      return { 
        ...state, 
        questionIcon: randomIcon,
        correctOption: randomIcon.title,
      }
    case 'GET_OPTIONS':
      const options = getOptions(state.uniqueIconsArray, state.questionIcon)
      return {
        ...state,
        options,
      }
    case 'SET_NEW_ANSWER':
      return {...state, answer: action.payload,
        points:
          action.payload === state.correctOption
            ? state.points + 10
            : state.points
      }
    case 'NEXT_QUESTION':
      const nextRandomIcon = getRandomIcon(state.uniqueIconsArray)
      const nextOptions = getOptions(state.uniqueIconsArray, nextRandomIcon)
      return {
        ...state,
        questionIcon: nextRandomIcon,
        correctOption: nextRandomIcon.title,
        options: nextOptions,
        answer: null,
        questionCnt: state.questionCnt + 1
      }
    case 'start':
      return {
        ...state, 
        status: 'active',
      }
    case 'FINISH':
      return {
        ...state,
        status: 'finish',
        questionIcon: null,
        options: [],
        correctOption: "",
        answer: null,
        questionCnt: 1,
      }
    case 'RESTART':
      return {
        ...state,
        points: 0,
        status: 'active'
      }
      default:
        throw new Error('Action unknown')
  }
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomIcon(iconArray){
  return iconArray[getRandomNumber(0, iconArray.length)]
}

function getOptions(iconArray, questionIcon){
  const optionsArray = iconArray.filter(icon => icon.title !== questionIcon.title)
  let options = []
  for(let i=0; i < 3; i++){
    options.push(optionsArray[getRandomNumber(0, optionsArray.length)])
  }
  options.push(questionIcon)
  const shuffledArray = shuffle(options)
  return shuffledArray
}

function shuffle(arr){
  for(let i = arr.length - 1; i > 0; i--){
    let j = Math.floor(Math.random() * (i + 1))
    let tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }
  return arr
}


function App() {
  const [{status, uniqueIconsArray, questionIcon, options, correctOption, answer, questionCnt, points, numQuestions, }, dispatch] = useReducer(reducer, initialState)
  const numIcons = uniqueIconsArray.length
  const maxPossiblePoints = numQuestions * 10
  useEffect(() => {
    const iconsArray = Object.values(icons)
    const titles = iconsArray.map(icon => icon.title);
    const titleCounts = {};
    titles.forEach(title => {
        titleCounts[title] = (titleCounts[title] || 0) + 1;
    });
    // Extract duplicated icons from array
    const duplicatedTitles = Object.keys(titleCounts).filter(title => titleCounts[title] > 1);
    const uniqueIconsArray = iconsArray.filter((icon, index, selfArray) => {
      return !duplicatedTitles.includes(icon.title) || index === selfArray.findIndex(i => i.title === icon.title);
    });

    dispatch({ type: 'SET_UNIQUE_ICONS', payload: uniqueIconsArray });
  }, [])

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'ready' && <StartScreen numIcons={numIcons} dispatch={dispatch}/>}
        {status === 'active' && (
          <>
          <Question 
            question={questionIcon} 
            options={options} 
            correctOption={correctOption} 
            dispatch={dispatch} answer={answer}
          />
            <NextButton 
              dispatch={dispatch} 
              answer={answer}
              questionCnt={questionCnt}
            />
            <Point points={points}/>
            <NumberQuestions 
              numQuestions={numQuestions}
              questionCnt={questionCnt}
            />
          </>
        )}
        {status === 'finish' && 
          <FinishScreen 
            points={points} 
            maxPossiblePoints={maxPossiblePoints}
            dispatch={dispatch}
          />
        }
      </Main>
    </div>
  );
}

export default App;