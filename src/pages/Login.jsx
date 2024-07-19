import React from 'react'
import Template from '../components/cores/Login/Template'
// import { AppContext } from '../appContext'

const Login = () => {

    // const {login, SetLogin} = useContext(AppContext);

  return (
    <div className='w-full h-[calc-(100vh-60px)]'>
        <Template login={true}
                  heading='Welcome Back'
                  description='Build skills for today, tomorrow, and beyond.'
                  blueText="Education to future-proof your career."
        />
    </div>
  )
}

export default Login