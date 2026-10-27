import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {

  const [currState, setCurrState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const {login} = useContext(AuthContext)

  const onSubmitHandler = (event)=>{
    event.preventDefault();

    if(currState === 'Sign up' && !isDataSubmitted){
      setIsDataSubmitted(true)
      return;
    }

    login(currState=== "Sign up" ? 'signup' : 'login', {fullName, email, password, bio})
  }

  return (
    <main className='auth-page'>

      <section className='auth-intro'>
        <div className='auth-brand'>
          <img src={assets.logo_icon} alt="" />
          <span>yapster</span>
        </div>
        <p className='auth-eyebrow'>A LITTLE CLOSER, EVERY DAY</p>
        <h1>Make room<br/>for <span>good chats.</span></h1>
        <p className='auth-description'>Your people, your moments, all in one place. Pick up where you left off.</p>
        <img src={assets.logo_big} alt="" className='auth-artwork'/>
      </section>

      <form onSubmit={onSubmitHandler} className='auth-form'>
        <div className='auth-form-heading'>
          <p className='auth-eyebrow'>WELCOME TO YAPSTER</p>
          <h2>
          {currState}
          {isDataSubmitted && <img onClick={()=> setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer'/>
          }
          </h2>
          <p className='auth-form-subtitle'>{currState === 'Sign up' ? 'Create your account and start connecting.' : 'Good to have you back.'}</p>
        </div>

        {currState === "Sign up" && !isDataSubmitted && (
          <input onChange={(e)=>setFullName(e.target.value)} value={fullName}
           type="text" className='auth-input' placeholder="Full name" required/>
        )}

        {!isDataSubmitted && (
          <>
          <input onChange={(e)=>setEmail(e.target.value)} value={email}
           type="email" placeholder='Email address' required className='auth-input'/>
          <input onChange={(e)=>setPassword(e.target.value)} value={password}
           type="password" placeholder='Password' required className='auth-input'/>
          </>
        )}

        {currState === "Sign up" && isDataSubmitted && (
            <textarea onChange={(e)=>setBio(e.target.value)} value={bio}
             rows={4} className='auth-input auth-textarea' placeholder='Write a short bio...' required></textarea>
          )
        }

        <button type='submit' className='auth-submit'>
          {currState === "Sign up" ? "Create account" : "Log in"}
        </button>

        <div className='auth-terms'>
          <input type="checkbox" required />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>
        <div className='auth-switch'>
          {currState === "Sign up" ? (
            <p>Already have an account? <span onClick={()=>{setCurrState("Login"); setIsDataSubmitted(false)}}>Log in</span></p>
          ) : (
            <p>New to Yapster? <span onClick={()=> setCurrState("Sign up")}>Create an account</span></p>
          )}
        </div>

      </form>
    </main>
  )
}

export default LoginPage
