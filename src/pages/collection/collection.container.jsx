import React from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

import CollectionPage from './collection.component'
import Spinner from '../../components/spinner/spinner.component'

const GET_COLLECTION_BY_TITLE = gql`
  query getCollectionsByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`

const CollectionPageContainer = ({ match }) => (
  <Query query={GET_COLLECTION_BY_TITLE} variables={{ title: match.params.categoryId }}>
    {({ loading, data }) => {
      console.log('data', data)
      console.log('match', match)
      if (loading) return <Spinner />
      if (data) return <CollectionPage collection={data.getCollectionsByTitle} />
    }}
  </Query>
)

export default CollectionPageContainer
