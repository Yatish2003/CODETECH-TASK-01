import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Nav.css";

function Navbar() {
    const [Search, setSearch] = useState("");
    const [getApi, setgetApi] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [visible, setVisible] = useState(false); 
    let navigate = useNavigate();

    // Get API data
    useEffect(() => {
        fetch('http://localhost:5000/product')
            .then(response => response.json())
            .then((resp) => { 
                setgetApi(resp); 
            });
    }, []);

  
    useEffect(() => {
        const filterData = getApi.filter((val) => {
            return val.product_name.toLowerCase().includes(Search.toLowerCase()) || val.category.toLowerCase().includes(Search.toLowerCase());
        });

        setSearchData(filterData);
    }, [Search, getApi]);

   
    function setDropdown(val) {
        setSearch(val);
        setVisible(val.length > 0); 
    }

  
    function local(id) {
        navigate('/products/description', { state: { id } });
    }

    // Dropdown styles
    const styleDiv = {
        width: '500px', 
        backgroundColor: 'white',
        position: 'absolute',
        padding: '3px',
        top: '44px',
        borderRadius: '10px',
        zIndex: '2',
        display: 'block',
        height: '300px',
        overflow: 'auto',
        cursor: 'pointer'
    };

    const styleDiv2 = {
        display: 'none'
    };

    return (
        <>
            <div className="navbar" style={{ display: "flex", justifyContent: "space-between", boxSizing: "border-box" }}>
                <div>
                    <Link to='/'>Home</Link>
                    <div className="dropdown">
                        <Link to='/products'>Products</Link>
                        <div className="dropdown-content">
                            <Link to='/products/mens'>Mens</Link>
                            <Link to='/products/womens'>Womens</Link>
                            <Link to='/products/kids'>Kids</Link>
                        </div>
                    </div>
                    <Link to='/carts'>Cart<i className="fa-solid fa-cart-shopping"></i></Link>
                </div>

                <div className='searchBar' style={{ position: 'relative' }}>
                    <input
                        type='text'
                        placeholder='Search'
                        style={{ width: '500px', marginRight: '5px', position: 'relative' }}
                        onChange={(e) => setDropdown(e.target.value)} 
                        value={Search} 
                    />
                    <div id='searchDrop' style={visible ? styleDiv : styleDiv2}>
                        {
                            searchData?.map((val) => {
                                return (
                                    <div key={val.id}>
                                        <p onClick={() => local(val.id)}>{val.product_name}</p><hr />
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>

                <div className='validation'>
                    <Link to='/login'>Login</Link>
                    <Link to='/signUp'>Signup</Link>
                </div>
            </div>
        </>
    );
}

export default Navbar;
