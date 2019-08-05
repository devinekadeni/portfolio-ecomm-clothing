import { createSelector } from 'reselect'

// reselect
// make the component only rerender when the corresponding state redux is changed
// because `reselect` helps them to watch which state is changing
// this is for memoization

const selectCart = state => state.cart

export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
)

// if multiple reselect
// export const selectCartItems = createSelector(
//   [selectCart, selectCart2],
//   (cart, cart2) => cart.cartItems
// )

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
)