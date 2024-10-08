import { useState } from 'react'
import './Register.css'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmPassword] = useState("")
  const navigate = useNavigate();

  async function Log(e) {
    e.preventDefault();

     
    const resp = await fetch("http://localhost:5172/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        confirmpassword
      }),
    })
    if (resp.ok) {
    
      navigate('/landing'); 
    } else {
      
      console.log("Login failed");
    }

 
  }

   
  

  return (
    <>
      <div>
        <Navbar/>
        <fieldset>
        <h1>Register</h1><br />
        <form >
          <label htmlFor="email">Email</label><br />
    <div className="in">     <input 
            type="text" 
            name="email" 
            onChange={(e) => setEmail(e.target.value)} 
            required
          /><br />
          
          <label htmlFor="password">Password</label><br />
          <input 
            type="password" 
            name="password" 
            onChange={(e) => setPassword(e.target.value)} 
            required
          /><br />
           <label htmlFor="password">confirm-Password</label><br />
          <input 
            type="password" 
            name="confirmpassword" 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required
          /></div> 
          <br /><br />
     <center> <button onClick={Log}>register</button> </center>   
     
        </form>
      
        </fieldset><br />
    

      </div>
    </>
  )
}

export default Register