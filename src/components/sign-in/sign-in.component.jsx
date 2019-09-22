import React, { Component, useState } from 'react'
import { connect } from 'react-redux'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions'

import './sign-in.styles.scss'

const SignIn = props => {
  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' })

  const { email, password } = userCredentials

  const handleSubmit = async e => {
    e.preventDefault()

    const { emailSignInStart } = props

    emailSignInStart(email, password)
  }

  const handleChange = e => {
    const { value, name } = e.target

    setUserCredentials({ ...userCredentials, [name]: value })
  }

  const { googleSignInStart } = props

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          value={email}
          label="email"
          onChange={handleChange}
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          label="password"
          onChange={handleChange}
          required
        />

        <div className="buttons">
          <CustomButton type="submit">Sign in</CustomButton>
          <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>
            Sign in with google
          </CustomButton>
        </div>
      </form>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password })),
})

export default connect(
  null,
  mapDispatchToProps
)(SignIn)
