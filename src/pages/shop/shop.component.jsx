import React from 'react'
import { connect } from 'react-redux'

import { Route } from 'react-router-dom'

import WithSpinner from '../../components/with-spinner/with-spinner.component'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
import { updateCollections } from '../../redux/shop/shop.actions'

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {
  state = {
    isLoading: true,
  }

  unsubscribeFromSnapshot = null

  componentDidMount() {
    const { updateCollection } = this.props

    const collectionRef = firestore.collection('collections')

    collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
      updateCollection(collectionsMap)
      this.setState({ isLoading: false })
    })
  }

  render() {
    const { match } = this.props
    const { isLoading } = this.state
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionOverviewWithSpinner isLoading={isLoading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:categoryId`}
          render={props => <CollectionPageWithSpinner isLoading={isLoading} {...props} />}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollection: collectionsMap => dispatch(updateCollections(collectionsMap)),
})

export default connect(
  null,
  mapDispatchToProps
)(ShopPage)
