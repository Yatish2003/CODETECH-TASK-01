import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useNavigate} from 'react-router-dom'
function Cart() {
    let [getValue, setgetValue] = useState([]);
    const [Counter, setCounter] = useState(1);
    let navigate=useNavigate();
    //Counter Add
    function add(product) {
        
        setCounter(prevCounter => {
            const newCounter = prevCounter + 1;
            const newPrice=newCounter*product.price;
            
            let counterVal = { ...product, quantity: newCounter,price:newPrice};
            console.log(counterVal, "counterVal");
    
            
            fetch(`http://localhost:5000/api/product/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json",
                    'Accept': 'application/json'
                },
                body: JSON.stringify(counterVal)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to update product');
                    }
                    return response.json();
                })
                .then((resp) => {
                    console.log(resp, "Product updated successfully");
                    gettingData();
                })
                .catch((err) => {
                    console.error("Error updating product:", err);
                });
    
            
            return newCounter;
        });
    
        console.log("Counter value updated");
    }
    

    //Counter Sub
    function sub(product) {
        
        setCounter(prevCounter => {
            
            const newCounter = prevCounter > 1 ? prevCounter - 1 : 1;
            const newPrice=newCounter*product.price;
            
            let counterVal = { ...product, quantity: newCounter,price:newPrice };
            console.log(counterVal, "Updated product");
    
           
            fetch(`http://localhost:5000/api/product/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json",
                    'Accept': 'application/json'
                },
                body: JSON.stringify(counterVal)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to update product');
                    }
                    return response.json();
                })
                .then((resp) => {
                    console.log(resp, "Product updated successfully");
                    gettingData();
                })
                .catch((err) => {
                    console.error("Error updating product:", err);
                });
    
            
            return newCounter;
        });
    
        console.log("Counter value updated");
    }
    
    console.log(Counter, "counter");
    //Get Api
    function gettingData() {
        fetch('http://localhost:5000/api/product')
            .then(response => response.json())
            .then((resp) => { setgetValue(resp) });
    }
    useEffect(() => {
        gettingData();
    }, [])





    function updateCart(obj) {
        console.log(obj.id,"obj.id")
        let cartVal = { ...obj, cart: false }
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
            .then((response) => {
                console.log(response, "updated");
                gettingData();
            })
            .catch((err) => { console.log(err) });


    }
    function buyNow(productId){
        console.log(productId,"productId")
        navigate('/buynow',{state:{productId}})

    }



    return (
        <>
            <div className='container-fluid d-flex justify-content-center flex-wrap m-3'>
                {
                    getValue.map((cartProduct) => {
                        if (cartProduct.cart === true) {
                            console.log(cartProduct.quantity)
                            return (
                                <Card key={cartProduct.id} style={{ width: '18rem', marginRight: "10px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                                    {/* Product Image */}
                                    <Card.Img
                                        variant="top"
                                        src={cartProduct.img || "holder.js/100px180"}
                                        style={{
                                            width: '100%',
                                            height: '200px',
                                            objectFit: 'cover',
                                            borderTopLeftRadius: "10px",
                                            borderTopRightRadius: "10px"
                                        }}
                                    />

                                    <Card.Body style={{ padding: "15px" }}>
                                        {/* Product Title */}
                                        <Card.Title className="text-primary" style={{ fontSize: "1.1rem", fontWeight: "600" }}>
                                            {cartProduct.product_name}
                                        </Card.Title>

                                        {/* Product Description */}
                                        <Card.Text style={{ fontSize: "0.875rem", color: "#555", marginBottom: "10px" }}>
                                            {cartProduct.description}
                                        </Card.Text>

                                        {/* Price */}
                                        <Card.Text style={{ color: "orange", fontWeight: "bold", fontSize: "1.1rem" }}>
                                            ₹{cartProduct.price}
                                        </Card.Text>

                                        {/* Quantity Controls */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                            <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Quantity:{cartProduct.quantity}</span>
                                            <div>
                                                <Button
                                                    variant="primary"
                                                    style={{
                                                        width: "30px",
                                                        height: "30px",
                                                        padding: "0",
                                                        borderRadius: "50%",
                                                        fontSize: "1.2rem",
                                                        lineHeight: "1.2"
                                                    }}
                                                    onClick={() => { add(cartProduct) }}
                                                >
                                                    +
                                                </Button>
                                                <Button
                                                    variant="primary"
                                                    style={{
                                                        width: "30px",
                                                        height: "30px",
                                                        padding: "0",
                                                        borderRadius: "50%",
                                                        fontSize: "1.2rem",
                                                        lineHeight: "1.2",
                                                        marginLeft: "5px"
                                                    }}
                                                    onClick={() => { sub(cartProduct) }}
                                                >
                                                    -
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="d-flex flex-column align-items-center">
                                            <Button
                                                variant="warning"
                                                style={{
                                                    width: "100%",
                                                    margin: "5px 0",
                                                    padding: "8px 0",
                                                    fontSize: "0.9rem",
                                                    borderRadius: "5px"
                                                }}
                                                onClick={() => { buyNow(cartProduct.id) }}
                                            >
                                                Buy Now
                                            </Button>

                                            <Button
                                                variant="danger"
                                                style={{
                                                    width: "100%",
                                                    margin: "5px 0",
                                                    padding: "8px 0",
                                                    fontSize: "0.9rem",
                                                    borderRadius: "5px"
                                                }}
                                                onClick={() => { updateCart(cartProduct) }}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>


                            )
                        }
                        return null;

                    })
                }
            </div>
        </>
    )
}

export default Cart


