import React, { useEffect, useState } from 'react'
import { json, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
function ProductsHome() {
    let [getdata, setgetdata] = useState([]);

    //Get Api
    useEffect(() => {
        fetch('http://localhost:5000/api/product')
            .then(response => response.json())
            .then((resp) => { setgetdata(resp) });
    }, [])
    console.log(getdata, "getdata")

    // View Data
    const navigate = useNavigate();
    function viewData(id) {
        navigate('/products/description', { state: { id } })
    }

    // Update Api

    function updateCartID(product) {

        fetch(`http://localhost:5000/api/product/${product.id}`)
            .then(resp => resp.json())
            .then(response => {

                updateCart(response);
            })
            .catch((err) => { console.log(err) })

        console.log("value send to function")
    }


    function updateCart(obj) {
        let cartVal = { ...obj, cart: true }
        console.log(cartVal, "cartVal")
        fetch(`http://localhost:5000/api/product/${obj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(cartVal)
        })
            .then(resp => resp.json())
            .then((response) => { console.log(response, "updated"); alert("Product Added to cart ") })
            .catch((err) => { console.log(err) })
    }



    return (
        <>

            <div className='sale container-fluid bg-dark text-center'>
                <h4 className='text-light'>Sale 20%off</h4>

            </div>
            <div className='container-fluid d-flex justify-content-center flex-wrap m-3'>

                {
                    getdata.map((products) => {
                        return (
                            <Card style={{ width: '18rem', margin: "10px", borderRadius: "15px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>

                                <Card.Img
                                    variant="top"
                                    src={products.img}
                                    style={{
                                        height: '250px',
                                        objectFit: 'cover',
                                        borderTopLeftRadius: '15px',
                                        borderTopRightRadius: '15px'
                                    }}
                                />
                                <Card.Body style={{ padding: '20px' }}>
                                    <Card.Title className="text-danger" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                                        {products.product_name}
                                    </Card.Title>
                                    <Card.Text style={{ fontSize: '0.875rem', color: '#555', marginBottom: '10px' }}>
                                        {products.description}
                                    </Card.Text>
                                    <Card.Text style={{ color: "orange", fontWeight: 'bold', fontSize: '1rem' }}>
                                        ₹{products.price}
                                    </Card.Text>

                                    {/* Adjusted button size and spacing */}
                                    <div className="d-flex flex-column align-items-center">
                                        <Button
                                            style={{
                                                marginBottom: "8px",
                                                width: "180px",
                                                backgroundColor: "navy",
                                                color: "#fff",
                                                borderRadius: "5px",
                                                padding: "8px",
                                                fontWeight: 'bold',
                                                fontSize: '0.875rem'
                                            }}
                                            onClick={() => { viewData(products.id) }}>
                                            View
                                        </Button>

                                        <Button
                                            variant="primary"
                                            style={{
                                                width: "180px",
                                                backgroundColor: "navy",
                                                color: "#fff",
                                                borderRadius: "5px",
                                                padding: "8px",
                                                fontWeight: 'bold',
                                                fontSize: '0.875rem'
                                            }}
                                            onClick={() => { updateCartID(products) }}>
                                            Add to Cart
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>

                        )

                    })
                }
            </div>
        </>
    )
}

export default ProductsHome
