import React from 'react'
import { Route } from 'react-router-dom'

import CollectionsOverview from '../../components/collections-overview/collections-overview.container'
import CollectionPage from '../collection/collection.container'

const ShopPage = ({ match, collection }) => {
  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} component={CollectionsOverview} />
      <Route path={`${match.path}/:categoryId`} component={CollectionPage} />
    </div>
  )
}

export default ShopPage
