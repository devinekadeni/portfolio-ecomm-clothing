import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore } from 'redux-persist'
import logger from 'redux-logger'
// import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

import { fetchCollectionsStart } from './shop/shop.sagas'
import rootReducer from './root-reducer'

const sagaMiddleware = createSagaMiddleware()

// const middlewares = [thunk]
const middlewares = [sagaMiddleware]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnchancers(applyMiddleware(...middlewares)))

sagaMiddleware.run(fetchCollectionsStart)

const persistor = persistStore(store)

export { store, persistor }
