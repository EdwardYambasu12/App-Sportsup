import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import React from "react"
import Home from "./components/home/home"
import Personal from "./components/personal/personal"
import "./bootstrap.min.css"


function App(){

  return(

    <Router>
      <Routes>
        <Route path="/" element = {<Home/>}></Route>
        <Route path="/personal" element = {<Personal/>}></Route>
      </Routes>
    </Router>

  )
}


export default App