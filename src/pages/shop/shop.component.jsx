import React from 'react'
import { connect } from 'react-redux'

import { Route } from 'react-router-dom'

import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
import { updateCollections } from '../../redux/shop/shop.actions'

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null

  componentDidMount() {
    const { updateCollection } = this.props

    const collectionRef = firestore.collection('collections')

    collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
      updateCollection(collectionsMap)
    })
  }

  render() {
    const { match } = this.props
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route path={`${match.path}/:categoryId`} component={CollectionPage} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  collection: 'abc',
})

const mapDispatchToProps = dispatch => ({
  updateCollection: collectionsMap => dispatch(updateCollections(collectionsMap)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopPage)
