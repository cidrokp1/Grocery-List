import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import Content from "./Content.js";
import Footer from "./Footer.js";
import AddItem from "./AddItem.js";
import SearchItem from "./SearchItem.js";
import apiRequest from "./apiRequest.js";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./App.css";


const App = () => {
    const API_URL = 'http://localhost:3500/items';

    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [search, setSearch] = useState("");
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [footerContent, setFooterContent] = useState("Nada a mostrar");


    //READ
    useEffect(() => {

        const fetchItems = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw Error('Did not receiver expected data');
                const listItems = await response.json();
                setItems(listItems);
                setFetchError(null);
            } catch (error) {
                setFetchError(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        setTimeout(() => {
            (async () => (await fetchItems()))()
        }, 2000)

    }, [])
   
    //CREATE
    const addItem = async (item) => {
        const id = items.length ? items[items.length - 1].id + 1 : 1;
        const myNewItem = { id, checked: false, item };
        const listItems = [...items, myNewItem];
        setItems(listItems);

        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(myNewItem)
        }
        const result = await apiRequest(API_URL, postOptions);
        if (result) setFetchError(result);
    }

    //UPDATE
    const handleCheck = async (id) => {
        const listItems = items.map(
            (item) => item.id === id ?
                { ...item, checked: !item.checked } : item);
        setItems(listItems);

        const myNewItem = listItems.filter(item => item.id == id);
        const updateOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ checked: myNewItem[0].checked })
        }
        const reqUrl = `${API_URL}/${id}`;
        const result = await apiRequest(reqUrl, updateOptions);
        if (result) setFetchError(result);
    }

    //DELETE
    const handleDelete = async (id) => {
        const listItems = items.filter((item) => item.id !== id);
        setItems(listItems);

        const myNewItem = listItems.filter(item => item.id == id);
        const deleteOptions = { method: 'DELETE' };
        const reqUrl = `${API_URL}/${id}`;
        const result = await apiRequest(reqUrl, deleteOptions);
        if (result) setFetchError(result);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newItem) return;
        addItem(newItem);
        setNewItem("");
    }

    return (
        <div className="app bg-white">
            <Header />
            <div className="my-4 container  shadow">

                <div className="row">

                    <AddItem
                        newItem={newItem}
                        setNewItem={setNewItem}
                        handleSubmit={handleSubmit}
                    />
                </div>
                <div className="row">
                    <SearchItem
                        search={search}
                        setSearch={setSearch}
                    />
                </div>
                <main className="row">
                    {isLoading && <p>Loading items...</p>}
                    {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
                    {!fetchError && !isLoading &&
                        <Content
                            items={
                                items.filter(
                                    (item) => (item.item)?.toLowerCase().includes(search?.toLowerCase())
                                )
                            }
                            setItems={setItems}
                            handleCheck={handleCheck}
                            handleDelete={handleDelete} />
                    }

                </main>
            </div>

            <Footer length={items.length} />
        </div>

    );
};

export default App;
