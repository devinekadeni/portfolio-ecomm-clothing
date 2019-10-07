import React from 'react'

import CollectionItem from '../collection-item/collection-item.container'

import Styles from './preview-collection.style.scss'

const CollectionPreview = ({ title, items }) => {
  return (
    <div className={`collection-preview ${Styles.test}`}>
      <h1 className="title">{title.toUpperCase()}</h1>
      <div className="preview">
        {items
          .filter((item, i) => i < 4)
          .map(item => (
            <CollectionItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  )
}

export default CollectionPreview
