import React from 'react';
import './style.css';
import Search from '@material-ui/icons/Search';

function InputSearch(props) {

    return (
        <div className="input-icons">
            <Search className="icon" />
            <input type="text"
                {...props}
                name="search"
                className="input-search"
                id="search" />
        </div>)
}
export default InputSearch