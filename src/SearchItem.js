import React from 'react'

const SearchItem = ({search, setSearch}) => {
    return (
        <form
            className='form-control d-flex justify-content-between searchForm'
            onSubmit={(e) => e.preventDefault()}>
            <label htmlFor='search'>Search</label>
            <input
                id='search'
                type='text'
                role='searchbox'
                placeholder='Search Items' 
                onChange={(e)=>setSearch(e.target.value) }
                />
        </form>
    )
}

export default SearchItem