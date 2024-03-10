import React, { useEffect, useState } from "react";
import {
  Container,
  Col,
  Card,
  Button,
  Badge,
  CloseButton,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Ball from "../assets/images/ball-img.png";
import {
  cartData,
  cartDetails,
  decrementQuantity,
  incrementQuantity,
} from "../app/features/gaelicStar/cartData.slice";
import { formatPrice } from "../utils/halper";

function Cart() {
  const dispatch = useDispatch();
  const cartDetail = useSelector(cartData);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  // console.log("cart page data: ", cartDetail);

  const subtotal = () => {
    let t = 0;
    for (let i = 0; i < cartDetail.length; i++) {
      t += Number(cartDetail[i]?.variant?.price) * Number(cartDetail[i]?.quantity);
    }
    setTotal(t);
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemoveData = (id) => {
    const removedData =
      cartDetail.length != 0
        ? cartDetail?.filter((item) => item.id !== id)
        : [];
    dispatch(cartDetails(removedData));
  };
  const navigateTo = (ref, slug) => {
    window.location.href = `/${ref}`;
  };



  useEffect(() => {
    subtotal();
  }, [cartDetail]);

  return (
    <Container className="py-5 ">
      <h1 className="text-white fw-600">Your Cart</h1>
      <Col className="my-5 ">
        {cartDetail.length === 0 && (
          <Card className="my-2 bg-transparent">
            <Card.Body>
              <Card.Title>Cart is empty.</Card.Title>
            </Card.Body>
          </Card>
        )}
        {cartDetail.length != 0 &&
          cartDetail?.map((item, index) => (
            <div key={index} className="d-flex justify-content-between align-items-end align-items-md-center checkout-box mb-4">
              <div className="d-flex align-items-center flex-wrap cart-box-style">
                <div className="position-relative">
                  <img
                    src={item.image ? item.image : Ball}
                    className="me-3"
                    width={"150px"}
                    alt="img not found"
                  />
                  <Badge className="rounded-circle" bg="#fff" color="#fff">
                    {item.quantity ? item.quantity : 0}
                  </Badge>
                </div>
                <div className="mt-3 mt-md-0">
                  <h5 className="sub-heading text-white fw-medium m-0 p-0">
                    {item?.name ? item?.name : "Product Name"}
                  </h5>
                  <span className="p-0 m-0 cart-gray">
                    Item: {item?.variant?.name}
                  </span><br />
                  <span className="p-0 m-0 cart-gray">
                    Unit Price: €{formatPrice(item?.variant?.price?item?.variant?.price:0)}
                  </span>
                  {/* <span className="text-gray p-0 m-0">
                    Size {item.size ? item.size : 0} - Color{" "}
                    {item.color ? item.color : "No Color"}
                  </span> */}
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center ">
                <Button
                  variant="transparent"
                  onClick={() => {
                    if (item?.quantity)
                      handleDecrement(item?.id)
                  }}
                >
                  <h4 className="text-white p-1 m-1">-</h4>
                </Button>
                <h3 className="text-white p-0 m-0">
                  {item?.quantity ? item?.quantity : 0}
                </h3>
                <Button
                  variant="transparent"
                  onClick={() => handleIncrement(item?.id)}
                >
                  <h4 className="text-white p-1 m-1">+</h4>
                </Button>
              </div>
              <div className="d-flex align-items-center">
                <h5 className="body-heading fw-medium text-white mb-0">
                  € {formatPrice(item?.variant?.price) + ' * ' + item?.quantity + '    '} = € {formatPrice(item?.variant?.price) * item?.quantity}
                </h5>
                <CloseButton
                  className="mx-2 p-1 bg-white"
                  size="lg"
                  // variant="danger"
                  onClick={() => handleRemoveData(item.id)}
                />
              </div>
            </div>

          ))}
      </Col>
      <div className="border-top-bottom border-white py-4 mb-3">
        <div className="d-flex justify-content-between">
          <h5 className="body-heading fw-normal text-white mb-0">Subtotal</h5>
          <div>
            <h5 className="body-heading fw-medium text-white mb-0">€ {total}</h5>
          </div>
        </div>
      </div>
      <Button className="cart-btn cart-checkout-btn d-flex justify-end ms-auto px-5 rounded-2 mt-5" variant="primary" onClick={() => navigateTo("checkout")}>
        Checkout
      </Button>
    </Container>
  );
}

export default Cart;
