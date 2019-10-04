import React, { useState } from 'react'
import { connect } from 'react-redux'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { signUpStart } from '../../redux/user/user.actions'
import './sign-up.styles.scss'

const SignUp = props => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
    displayName: '',
    confirmPassword: '',
  })

  const { displayName, email, password, confirmPassword } = userCredentials

  const handleSubmit = async e => {
    e.preventDefault()

    const { signUpStart } = props

    if (password !== confirmPassword) {
      alert("passwords don't match")
      return
    }

    signUpStart({ displayName, email, password })
  }

  const handleChange = e => {
    const { name, value } = e.target

    setUserCredentials({ ...userCredentials, [name]: value })
  }

  return (
    <div className="sign-up">
      <h2 className="title">I do not have a account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit} className="sign-up-form">
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label="Display Name"
        />

        <FormInput
          type="text"
          name="email"
          value={email}
          onChange={handleChange}
          label="Email"
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Passwrod"
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
        />
        <CustomButton type="submit">SIGN UP</CustomButton>
      </form>
    </div>
  )
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  signUpStart: userCredential => dispatch(signUpStart(userCredential)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)
