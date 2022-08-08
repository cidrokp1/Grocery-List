import React, { useState } from 'react'
import MovieList from "./MovieList.js";
import ItemList from "./ItemList.js";

import "./Tuturial.css"

const Content = ({ items, setItems, handleCheck, handleDelete }) => {


    return (
        <>
            {items.length ? (
                <ItemList
                    items={items}
                    setItems={setItems}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete} />
            ) : (
                <p style={{ marginTop: "2rem" }}>Your list is empty</p>
            )}


            {/* <MovieList />  */}


        </>
    )
}

export default Content