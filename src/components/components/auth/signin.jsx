import React from 'react';
import { useState } from "react";
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"
import Mini_Nav from "../nav/mini-nav"
import './signin.css'; // Make sure to adjust the path based on your project structure
import heheImage from '../images/main_logo.png'; // Make sure to adjust the path based on your project structure

function Register() {

  const [email_value, setEmail_value] = useState()
  const [password_value, setPassword_value] = useState()
  const [terms, setTerms] = useState()
  const [error, setError] = useState()
  const [remember, setRemember] = useState()
  const navigate = useNavigate()
async  function poster(){
console.log(terms)

  if (terms == false){
      setError("Please accept the terms and conditions to complete this action")
  }
  if(email_value == ""){
      setError("Fill in email slot")
    }
  else if(password_value == ""){
    setError("Fill in Password slot")
  }
  else if(terms == false){
    
      setError("Please accept the terms and conditions to complete this action")
    }
    
    else if (terms == true){
      setError()

      try{
        const data = {
          email_reader : email_value, 
          password_reader : password_value,
          confirm_password : password_value
        }

         fetch("http://localhost:6100/sign-in", {method : "POST", headers : {"content-type": "application/x-www-form-urlencoded"}, body :new URLSearchParams(data)})
      async function late(){
        const answer = await fetch("http://localhost:6100/login_answer")
        const json = await answer.json()
        console.log(json)
        alert(json.text)
        if (json["state"] === "success"){
          const data1 = JSON.stringify(data)
          await localStorage.setItem("data", data1)
          navigate("/")

        }
        else if(json["state"] === "error"){
          setError("Email have already been used")
        }
      }
      setTimeout(late, 3000)
      }

      catch(error){

      }
    }
  
  }

  return (
    <body>
    <Mini_Nav/>
    <div className="d-flex align-items-center py-4 bg-body-tertiary">
  
      <main className="form-signin w-100 m-auto">
        <div>
          <img className="mb-4" src={heheImage} alt="SPORTS UP" width="95" height="95" />
          <h1 className="h3 mb-3 fw-normal">Please Register</h1>

          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" onChange = {(value)=>setEmail_value(value.target.value)} placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <br></br>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"  onChange = {(value)=>setPassword_value(value.target.value)} />
            <label htmlFor="floatingPassword">Password</label>
          </div>


          <hr></hr>
          <div className="form-check text-start my-3">
            <input className="form-check-input"  onChange={(value)=>setTerms(value.target.checked)} type="checkbox" value="terms and conditions" id="flexCheckDefault" />
            <label className="form-check-label" htmlFor="flexCheckDefault">
             I agree to all terms and condition governing this site.
            </label>
          </div>
          <button onClick = {()=> poster()}className="btn btn-primary w-100 py-2" type="submit">
            Sign in
          </button>
          <br></br>
          <hr></hr>
          <h5 className = "text-center text-warning">You already have an account</h5>
          <br></br>
          <Link to = {"/login"}className="btn btn-success w-100 py-2" type="submit" id = "submit_link" >
            Proceed to Login
          </Link>
          <h4 className = "text-danger">{error}</h4>
        </div>
      </main>
    
    </div>

    </body>
  );
}

export default Register;