import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';
function Mens() {
    // Get Api
    const [mensProduct, setmensProduct] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/api/product')
            .then(response => response.json())
            .then((resp) => { setmensProduct(resp) })
            .catch((err) => { console.log(err) });
    }, []);
    console.log(mensProduct, "mens")

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
        let cartVal = {...obj,cart:true }
        console.log(cartVal,"cartVal")
        fetch(`http://localhost:5000/api/product/${obj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(cartVal)
        })
            .then(resp => resp.json())
            .then((response) => { console.log(response, "updated");
                Swal.fire({
                    title: "Product added to cart",
                    showClass: {
                        popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `
                    },
                    hideClass: {
                        popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
                    }
                }); })
            .catch((err) => { console.log(err) })
    }

    return (
        <>
            <div className='container-fluid d-flex justify-content-center flex-wrap m-3'>

                {
                    mensProduct.map((val) => {
                        if(val.category =="mens"){
                            return (
                                <Card style={{ width: '20rem', margin: "15px", borderRadius: "15px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
    {/* Increased Image Size */}
    <Card.Img 
        style={{
            width: '100%', // Ensure the image spans full width of the card
            height: '250px', // Increased image height for prominence
            objectFit: 'cover', 
            borderTopLeftRadius: '15px', 
            borderTopRightRadius: '15px' 
        }} 
        variant="top" 
        src={val.img} 
    />
    <Card.Body style={{ padding: '20px' }}>
        {/* Product Title */}
        <Card.Title className="text-danger" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
            {val.product_name}
        </Card.Title>

        {/* Product Description */}
        <Card.Text style={{ fontSize: '0.875rem', color: '#555', marginBottom: '10px' }}>
            {val.description}
        </Card.Text>

        {/* Price Text */}
        <Card.Text style={{ color: "orange", fontWeight: 'bold', fontSize: '1rem' }}>
            ₹{val.price}
        </Card.Text>

        {/* Buttons */}
        <div className="d-flex flex-column align-items-center">
            <Button 
                style={{
                    marginBottom: "8px",  // Reduced margin
                    width: "180px",  // Reduced width
                    backgroundColor: "navy", 
                    color: "#fff", 
                    borderRadius: "5px", 
                    padding: "8px", // Reduced padding
                    fontWeight: 'bold',
                    fontSize: '0.875rem'  // Reduced font size for the buttons
                }} 
                onClick={() => { viewData(val.id) }}>
                View
            </Button>
            
            <Button 
                variant="primary" 
                style={{
                    width: "180px", // Reduced width
                    backgroundColor: "navy", 
                    color: "#fff", 
                    borderRadius: "5px", 
                    padding: "8px",  // Reduced padding
                    fontWeight: 'bold',
                    fontSize: '0.875rem'  // Reduced font size for the buttons
                }} 
                onClick={() => { updateCartID(val) }}>
                Add to Cart
            </Button>
        </div>
    </Card.Body>
</Card>

                            )
                        }

                    })
                }
            </div>
        </>
    )
}

export default Mens