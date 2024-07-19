import React from 'react'
import Template from '../components/cores/Login/Template'
// import { AppContext } from '../appContext'

const Signup = () => {
    // const {login} = useContext(AppContext)
  return (
    <div>
        <Template login={false}
                  heading='Join the millions learning to code with StudyNotion for free'
                  description='Build skills for today, tomorrow, and beyond.'
                  blueText="Education to future-proof your career."
        />
    </div>
  )
}

export default Signup