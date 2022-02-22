import React, { useContext, useReducer, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'react-datetime/css/react-datetime.css'

import Navbar from './Navbar'
import Alert from './Alert'

// STATIC VIEWS
import Home from './views/Home'
import ErrorPage from './views/ErrorPage'

import Contest from './views/Contest'
import AllContests from './views/AllContests'

import { Login, Register } from './auth'
import QuestionForm from './forms/QuestionCreate'
import ContestForm from './forms/ContestCreate'
import ContestUpdate from './forms/ContestUpdate'
import Scoreboard from './views/Scoreboard'

// ADMIN IMPORTS
import Admin from './views/admin/Admin'
import ContestAdmin from './views/admin/ContestAdmin'
import AllContestsAdmin from './views/admin/AllContestsAdmin'

// TEST IMPORTS
import Test from './Test'

// CONTEXT
import UserContext from './UserContext'
import AlertContext from './AlertContext'

// REDUCER
import alertReducer from './utils/alertReducer'

function App() {
  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem('token')
    return saved || ''
  })

  // type should be compatible to bootstrap bg types
  const [alert, alertDispatch] = useReducer(alertReducer, {
    show: false,
    style: 'success',
    content: 'default alert',
  })

  return (
    <AlertContext.Provider value={{ alert, alertDispatch }}>
      <UserContext.Provider value={{ token, setToken }}>
        <Router>
          <Navbar />
          <Alert />
          <Routes>
            <Route exact path='/' element={<Home />}></Route>

            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>

            <Route path='/contests' element={<AllContests />}></Route>

            {/* Routes for the participants */}
            <Route
              exact
              path='/contests/:contestId'
              element={<Contest />}
            ></Route>

            <Route
              exact
              path='/contests/:contestId/scoreboard'
              element={<Scoreboard />}
            ></Route>

            {/* Routes for the Admin*/}

            <Route exact path='/admin' element={<Admin />}></Route>

            <Route
              exact
              path='/admin/contests'
              element={<AllContestsAdmin />}
            ></Route>

            <Route
              path='admin/contests/create'
              element={<ContestForm />}
            ></Route>

            <Route
              exact
              path='/admin/contests/:contestId/update'
              element={<ContestUpdate />}
            ></Route>

            <Route
              exact
              path='/admin/contests/:contestId/create-question'
              element={<QuestionForm />}
            ></Route>

            <Route
              exact
              path='/admin/contests/:contestId'
              element={<ContestAdmin />}
            ></Route>

            <Route path='*' element={<ErrorPage />}></Route>
          </Routes>
        </Router>
      </UserContext.Provider>
    </AlertContext.Provider>
  )
}

export default App
