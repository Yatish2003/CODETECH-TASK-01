import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

function Description() {
    const [getValue, setgetValue] = useState([]);
    const [Img,setImg]=useState("");
    let navigate=useNavigate();
    const location = useLocation();
    const navigateId = location.state.id;
    console.log(navigateId)

    // Get Api
    useEffect(() => {
        fetch('http://localhost:5000/api/product')
            .then(response => response.json())
            .then((resp) => { setgetValue(resp) });
    }, []);

    function showImg(Img){
        setImg(Img);

    } 
    console.log(Img,"Img")

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

    function buyNow(productId){
        console.log(productId,"productId")
        navigate('/buynow',{state:{productId}})

    }


    return (
        <div className='container-fluid d-flex justify-content-center flex-wrap m-3'>
            {
                getValue.map((val) => {

                    if (navigateId == val.id) {

                        return (
                            <Card key={val.id} style={{ width: '60rem' }} className="shadow-sm border-light d-flex flex-column">
                            {/* Product Image Section */}
                            <div className="d-flex justify-content-center mb-3">
                                <div className="flex-shrink-0" style={{ width: '500px', height: '500px', backgroundSize: 'cover' }}>
                                    <Card.Img
                                        variant="top"
                                        src={Img ? Img : val.img}
                                        style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '10px' }}
                                    />
                                </div>
                        
                                {/* Thumbnails for alternative views */}
                                <div className="ml-4 d-flex flex-column justify-content-between" style={{ height: '500px' }}>
                                    <div
                                        onMouseEnter={() => { showImg(val.img1) }}
                                        className="thumbnail mb-2"
                                        style={{ width: '100px', height: '100px', backgroundSize: 'cover', borderRadius: '5px', cursor: 'pointer' }}>
                                        <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={val.img1} />
                                    </div>
                                    <div
                                        onMouseEnter={() => { showImg(val.img2) }}
                                        className="thumbnail mb-2"
                                        style={{ width: '100px', height: '100px', backgroundSize: 'cover', borderRadius: '5px', cursor: 'pointer' }}>
                                        <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={val.img2} />
                                    </div>
                                    <div
                                        onMouseEnter={() => { showImg(val.img3) }}
                                        className="thumbnail mb-2"
                                        style={{ width: '100px', height: '100px', backgroundSize: 'cover', borderRadius: '5px', cursor: 'pointer' }}>
                                        <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={val.img3} />
                                    </div>
                                </div>
                            </div>
                        
                            {/* Product Information Section */}
                            <div className="d-flex flex-column justify-content-between p-4" style={{ flexGrow: 1 }}>
                                {/* Product Title */}
                                <Card.Title className="text-primary" style={{ fontSize: '1.8rem' }}>{val.product_name}</Card.Title>
                                
                                {/* Rating */}
                                <div className="d-flex align-items-center mb-2">
    <span className="text-warning">
        {/* Using star icons for rating */}
        {[...Array(5)].map((_, index) => {
            const randomRating = 3.5 + Math.random() * (5 - 3.5);  // Generate a random rating between 3.5 and 5
            const fullStars = Math.floor(randomRating);  // Full stars to show
            const hasHalfStar = randomRating - fullStars >= 0.5;  // Check if half star is required
            return (
                <i
                    key={index}
                    className={`fa fa-star ${index < fullStars ? 'checked' : ''} ${index === fullStars && hasHalfStar ? 'fa-star-half-alt' : ''}`}
                />
            );
        })}
    </span>
    <span className="ml-2 text-muted">({val.review_count} reviews)</span>
</div>

                        
                                {/* Product Price */}
                                <div className="d-flex align-items-center mb-3">
                                    <Card.Subtitle className="text-muted" style={{ fontSize: '1.2rem' }}>₹{val.price}</Card.Subtitle>
                                    {val.discount && (
                                        <span className="ml-2 text-success" style={{ fontSize: '1.2rem' }}>
                                            {val.discount}% OFF
                                        </span>
                                    )}
                                </div>
                        
                                {/* Description */}
                                <Card.Text>
                                    <strong>Description:</strong> {val.description}
                                </Card.Text>
                        
                                {/* Specifications */}
                                {val.specifications && (
                                    <div className="mb-3">
                                        <h5>Specifications:</h5>
                                        <ul>
                                            {val.specifications.map((spec, index) => (
                                                <li key={index}>{spec}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                        
                                {/* Additional Info (if any) */}
                                {val.additional_info && (
                                    <div className="mb-3">
                                        <h5>Additional Information:</h5>
                                        <ul>
                                            {val.additional_info.map((info, index) => (
                                                <li key={index}>{info}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                        
                                {/* Add to Cart / Buy Now */}
                                <div className="d-flex justify-content-between mt-auto">
                                    <Button variant="success" style={{ width: '48%' }} onClick={() => { updateCartID(val) }}>Add to Cart</Button>
                                    <Button variant="warning"  style={{ width: '48%' }} onClick={() => { buyNow(val.id)}}>Buy Now</Button>
                                </div>
                            </div>
                        
                           
                            
                        </Card>
                        


                        );
                    }

                })
            }
        </div>
    );
}

export default Description;
