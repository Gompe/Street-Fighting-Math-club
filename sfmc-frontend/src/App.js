import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//62041c75f432035394e53d88

import Home from './Home'
import Contest from './competition/components/Contest'
import ErrorPage from './error/ErrorPage';
import {Login, Register} from './auth'
import QuestionForm from './forms/createQuestion';

function App() {
  return <Router>
    <Routes>
      <Route exact path='/' element={ <Home/> }></Route>

      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>

      <Route path='/contest/:contestId' element={ <Contest/> }></Route>
      <Route path='/questions/create/:contestId' element={ <> <QuestionForm/> <Contest/> </> }></Route>

      <Route path='*' element={<ErrorPage/>}></Route>
    </Routes>
  </Router>
}

export default App;
