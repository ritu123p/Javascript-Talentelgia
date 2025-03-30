import React, { act, use, useEffect, useState } from 'react'
import './LoginSingup.css'
const Login_Sigup = () => {
    // const [data,setData]=useState<string>('')
    const [name,setName]=useState<string>('')
    const [email,setEmail]=useState<string>('')
    const [password,setPassword]=useState<string>('')
    const [confirmpassword,setConfirmPassword]=useState<string>('')
    const [showSubmit,setShowSubmit]=useState<boolean>(false)
    const [error,setError]=useState<string>('')
    const [actions,setAction]=useState("Login")
    // useEffect(()=>{
    //     if(actions==="Sign Up"){
    //         setShowSubmit(!!(name && email && password && confirmpassword))
    //     }else{
    //         setShowSubmit(!!(email && password))
    //     }
         
        
    // },[actions,name,email,password,confirmpassword])
    // Email validation function
    useEffect(() => {
        if (actions === "Sign Up") {
            setShowSubmit(!!(name && email && password && confirmpassword));
        } else {
            setShowSubmit(!!(email && password));
        }
    }, [actions, name, email, password, confirmpassword]);
     
   const isValidEmail = (email: string) => {
    return /^[a-zA-Z0-9+_.%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };
    // Password validation function
    const isValidPassword = (password: string) => {
        return password.length >= 6;
      };
    const handlesubmit=(e:React.FormEvent<HTMLButtonElement>)=>{
        e.preventDefault()
       
        if (actions === "Sign Up") {
            if (!name || !email || !password || !confirmpassword) {
              setError("All fields are required!");
              return;
            }
            if (!isValidEmail(email)) {
              setError("Invalid email format!");
              return;
            }
            if (!isValidPassword(password)) {
              setError("Password must be at least 6 characters long!");
              return;
            }
            if (password !== confirmpassword) {
              setError("Passwords do not match!");
              return;
            }
          } else {
            if (!email || !password) {
              setError("Email and password are required!");
              return;
            }
            if (!isValidEmail(email)) {
              setError("Invalid email format!");
              return;
            }
          }
          const formdata={name,email,password}
          console.log(formdata)
        setError("")
        console.log("Form Data:",{name,email,password})
        //////
        setName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }
     
  return (
    <>
        <div className='container'> 
            <div className='header'>
                <div className='text'>{actions}</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                {actions==="Sign Up"?
                    <div className='input'>
                    <img src='' alt=''/>
                    <input type='text' placeholder='Enter your name' onChange={(e)=>setName(e.target.value)} value={name}/>
                </div>:null}
                <div className='input'>
                    <img src='' alt=''/>
                    <input type='email' placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
                </div>

                <div className='input'>
                    <img src='' alt=''/>
                    <input type=' password' placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)} value={password}/>
                </div>
                {actions==="Sign Up"? <div className='input'>
                    <img src='' alt=''/>
                    <input type='confirm-password' placeholder='Enter your confirm password' onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmpassword}/>
                </div>:null}
               
                {error && <p className="error-message">{error}</p>}

                {actions==="Sign Up"?<div></div>:<div className='forgot-password'>Lost Password ?<span>Click her</span></div>
                }
                <div className="parent-container">
                <div className='submits'>
                    <button type='submit' onClick={(e)=>handlesubmit(e)} disabled={!showSubmit}>submit</button>
                </div>
                </div>
               
                <div className='submit-container'>
                    <div className={actions==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
                    <div className={actions==="Sign Up" ? "submit gray":'submit' } onClick={()=>{setAction("Login")}}>Login</div>
                </div>
            </div>
        </div>
        
    
    </>
  )
}

export default Login_Sigup