import React, { useState } from 'react' 
import LineItem from './LineItem'

const ItemList = ({ items, setItems, handleCheck, handleDelete }) => {
    return (
        <ul>
            {items.map((item) => (
               <LineItem
                key={item.id}
                item={item} 
                handleCheck={handleCheck}
                handleDelete={handleDelete}
               />
            ))}
        </ul>
    )
}

export default ItemList