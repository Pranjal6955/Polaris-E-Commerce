import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './Homepage/HomePage'
import Products from './Products/Products'
import Signin from './Auth/Signin'
import Signup from './Auth/Signup'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/Homepage' element={<HomePage />} />
          <Route path='/Products' element={<Products />} />
          <Route path='/Signin' element={<Signin/>} />
          <Route path='/Signup' element={<Signup/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

