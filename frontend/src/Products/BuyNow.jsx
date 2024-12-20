import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';

function BuyNow() {
    const [Data, SetData] = useState([]);
    const [isPurchased, setIsPurchased] = useState(false);
    let location = useLocation();
    let buyNowID = location.state.productId;
    let navigate=useNavigate();
    function gettingData() {
        fetch('http://localhost:5000/api/product')
            .then(response => response.json())
            .then((resp) => { SetData(resp) });
    }
    useEffect(() => {
        gettingData();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thank you for your purchase! Your order is being processed.",
            showConfirmButton: false,
            timer: 1500
          })
    }, [])



    const shopMore = () => {
        navigate('/')
    };

    return (
        <>
            {
                Data.map((val) => {
                    if (val.id == buyNowID) {
                        return (
                            <Container className="mt-5">
                                <Row className="justify-content-center">
                                    <Col md={5}>
                                        <Card>
                                            <Card.Img
                                                variant="top"
                                                src={val.img}
                                                alt="Product Image"
                                                style={{ width: '100%', height: '450px', objectFit: 'cover' }}
                                            />
                                            <Card.Body>
                                                <Card.Title><strong>{val.product_name}</strong></Card.Title>
                                                <Card.Text>
                                                    {val.description}
                                                </Card.Text>
                                                <Card.Text >
                                                    <strong className='text-warning'>Price: {val.price}</strong>
                                                </Card.Text>
                                                <Button variant="primary" onClick={()=>{shopMore()}}>
                                                    Shop More
                                                </Button>
                                            </Card.Body>
                                        </Card>


                                    </Col>
                                </Row>
                            </Container>
                        )
                    }
                })
            }
        </>
    )
}

export default BuyNow
