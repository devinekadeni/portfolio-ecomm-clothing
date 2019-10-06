import React, { useContext } from 'react'

import CollectionItem from '../../components/collection-item/collection-item.component'

import CollectionsContext from '../../contexts/collections/collections.context'

import './collection.styles.scss'

const CollectionPage = ({ match }) => {
  // Context Component Way - START
  // return (
  //   <CollectionsContext.Consumer>
  //     {collections => {
  //       const collection = collections[match.params.categoryId]
  //       const { title, items } = collection

  //       return (
  //         <div className="collection-page">
  //           <h2 className="title">{title}</h2>
  //           <div className="items">
  //             {items.map(item => (
  //               <CollectionItem key={item.id} item={item} />
  //             ))}
  //           </div>
  //         </div>
  //       )
  //     }}
  //   </CollectionsContext.Consumer>
  // )
  // Context Component Way - FINISH

  // Context Hooks Way - START
  const collections = useContext(CollectionsContext)
  const collection = collections[match.params.categoryId]
  const { title, items } = collection

  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
  // Context Hooks Way - FINISH
}

export default CollectionPage
