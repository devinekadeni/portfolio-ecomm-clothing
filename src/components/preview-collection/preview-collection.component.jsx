import React from 'react'

import CollectionItem from '../collection-item/collection-item.component'

import Styles from './preview-collection.style.scss'

const CollectionPreview = ({ title, items }) => {
  return (
    <div className={`collection-preview ${Styles.test}`}>
      <h1 className="title">{title.toUpperCase()}</h1>
      <div className="preview">
        {items
          .filter((item, i) => i < 4)
          .map(({ id, ...otherProps }) => (
            <CollectionItem key={id} {...otherProps} />
          ))}
      </div>
    </div>
  )
}

export default CollectionPreview
