import React from 'react'

import CollectionPreview from '../preview-collection/preview-collection.component'

import './collections-overview.styles.scss'

const CollectionsOverview = ({ collections }) => {
  console.log('coll', collections)
  return (
    <div className="collections-overview">
      {collections.map(({ id, ...otherProps }) => (
        <CollectionPreview key={id} {...otherProps} />
      ))}
    </div>
  )
}

export default CollectionsOverview
