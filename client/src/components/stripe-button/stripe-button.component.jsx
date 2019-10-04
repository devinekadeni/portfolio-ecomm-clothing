import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100
  const publishableKey = 'pk_test_B8Xveze3CT7ouy2jvKco8DDC006XDo8KiL'
  const onToken = token => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token,
      }
    }).then(resp => {
      console.log('es',resp)
      alert('Payment successful')
    }).catch(error => {
      console.log('Payment error: ', JSON.parse(error))
      alert('there was an issue with your payment. Please sure you use the proper card')
    })
  }

  return (
    <StripeCheckout
      label="Pay Now"
      name="CROWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton
