import React, { lazy } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Home from './home'
import About from './about'
import Dashboard from './dashboard'
import Login_Sigup from '../LogInForm/login_Signup'
///lazy loading componets
const Home=lazy(()=>import("./home"))
const LoginSignUp=lazy(()=>import("../LogInForm/login_Signup"))
const Navbar = () => {
  return (
    <>
    <div>Navbar</div>
    <div>
        <ul>
            <li>
                {/* <Link to='/'>Home</Link> */}
                <NavLink to='/'>Home</NavLink>
            </li>
            <li>
                {/* <Link to='/about'>About</Link> */}
                <NavLink to='/about'>About</NavLink>

            </li>
            <li>
                {/* <Link to='/dasboard'>Dashbord</Link> */}
                <NavLink to='/dasboard'>Dasboard</NavLink>

            </li>
            <li>
                {/* <Link to='/login'>Login</Link> */}
                <NavLink to='/login'>Login</NavLink>

            </li>

            
        </ul>
    </div>
    </>
  )
}

export default Navbar