import React from 'react'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'
import flowRight from 'lodash/flowRight'

import CartIcon from './cart-icon.component'

const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`

const GET_ITEM_COUNT = gql`
  {
    itemCount @client
  }
`

const CartIconContainer = props => (
  <CartIcon toggleCartHidden={props.toggleCartHidden} itemCount={props.data.itemCount} />
)

export default flowRight(
  graphql(GET_ITEM_COUNT),
  graphql(TOGGLE_CART_HIDDEN, { name: 'toggleCartHidden' })
)(CartIconContainer)
