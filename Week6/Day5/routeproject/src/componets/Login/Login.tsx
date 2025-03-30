import login from "../Login/login.css"
const Login = () => {
  return (
    <>
     <p className='title'>Login Page</p>
     <form className='Log'>
        <input type='text'/>
        <input type='email'/>
        <input type='password'/>
        <input type={'submit'}
        style={{backgroundColor:"#a1eafb"}}/>
     </form>
    </>
   
  )
}

export default Login