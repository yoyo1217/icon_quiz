import { useEffect, useReducer } from "react";
import * as icons from 'simple-icons'

import Header from "./Header";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Main from "./Main";


const initialState = {
  uniqueIconsArray: [],
  questionIcon: null,
  options: [],
  // loading, error, ready, active, finished
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
        questionIcon: randomIcon
      }
    case 'GET_OPTIONS':
      const options = getOptions(state.uniqueIconsArray, state.questionIcon)
      return {
        ...state,
        options,
      }

    case 'start':
      return {...state, status: 'active'}
    case 'quizSet':
      return {
        ...state,

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
  return options
}


function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const numQuestions = state.uniqueIconsArray.length
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
        {state.status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
        {state.status === 'active' && <Question question={state.questionIcon} options={state.options} dispatch={dispatch}/>}
      </Main>
    </div>
  );
}

export default App;