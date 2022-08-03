import React, { Component } from 'react';

class Search extends Component {
    render() {
        return (
            <div className="tim">
                <input className="otim" type="text" placeholder="Nhập từ khóa" />
                <input className="nuttim" type="button" defaultValue="Tìm kiếm" />
                <hr />
            </div>
        );
    }
}

export default Search;