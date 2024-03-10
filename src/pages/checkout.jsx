import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Accordion,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { cartData } from "../app/features/gaelicStar/cartData.slice";
import Ball from "../assets/images/ball-img.png";
import { Badge } from "react-bootstrap";
import PayPalButton from "../Components/Paypal";
import { formatPrice } from "../utils/halper";
import { CreatePostRequest, PostRequest } from "../utils/api";
import { Toaster, toast } from "react-hot-toast";

const CheckoutPage = () => {
  const cartDetail = useSelector(cartData);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [VAT, setVAT] = useState("19.26");
  const [shipping, setShipping] = useState(0.00);
  const [checkoutDetails, setCheckoutDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    country: "",
    postalCode: "",
    city: "",
    state: "",
    phoneNumber: "",
    creditCard: "",
    paypal: "",
  });


  const totalPrice = () => {
    let st = 0;
    for (let i = 0; i < cartDetail.length; i++) {
      st += parseFloat(cartDetail[i].variant.price) * parseInt(cartDetail[i].quantity);
    }
    setSubtotal(st.toFixed(2));
    let t = st + Number(shipping);
    setTotal(t.toFixed(2));
  };


  const onChangeHandler = (e, name) => {
    let value = e.target.value;
    setCheckoutDetails({
      ...checkoutDetails,
      [name]: value,
    });
  };

  const placeOrder = () => {
    if (!checkoutDetails.email) {

    }

    const data = { 
      products: JSON.stringify(cartDetail),
      email: checkoutDetails.email,
      firstName: checkoutDetails.firstName,
      lastName: checkoutDetails.lastName,
      address1: checkoutDetails.address1,
      address2: checkoutDetails.address2,
      country: checkoutDetails.country,
      postalCode: checkoutDetails.postalCode,
      city: checkoutDetails.city,
      state: checkoutDetails.state,
      phoneNumber: checkoutDetails.phoneNumber,
      totalAmount: total,
      paymentMethod: 'COD' // paypal
    }
    CreatePostRequest("api/order/create", data).then((res) => {
      // console.log("place order res : ", res);
      if (res.status) {
        toast.success(res.data.message);
      }else{
        toast.error("something went wrong!");
      }
    });

  }

  useEffect(() => {
    totalPrice();
    console.log('cartDetails', cartDetail)
  }, [cartDetail]);

  return (
    <Container className="py-5">
      <h1 className="text-light">Checkout</h1>
      <Row className="checkout-accordion">
        <Col sm={12} md={6}>
          <Form className="checkout">


            <input
              name="email"
              aria-label="Email"
              autocomplete="email"
              className="w-100 p-2 m-0 bg-transparent text-light my-2 "
              data-test="input"
              maxlength="100"
              placeholder="Email"
              type="email"
              value={checkoutDetails.email}
              onChange={(e) => onChangeHandler(e, "email")}
            />
            {/* <div>
              <p>
                You'll receive receipts and notifications at this email
                address.
              </p>
            </div> */}

            <input
              name="firstName"
              aria-label="firstName"
              className="w-100 p-2 m-0 bg-transparent text-light my-2 "
              data-test="input"
              maxlength="100"
              placeholder="First Name"
              type="text"
              value={checkoutDetails.firstName}
              onChange={(e) => onChangeHandler(e, "firstName")}
            />
            <input
              name="lastName"
              aria-label="lastName"
              className="w-100 p-2 m-0 bg-transparent text-light my-2 "
              data-test="input"
              maxlength="100"
              placeholder="Last Name"
              type="text"
              value={checkoutDetails.lastName}
              onChange={(e) => onChangeHandler(e, "lastName")}
            />
            <input
              name="address1"
              aria-label="address1"
              className="w-100 p-2 m-0 bg-transparent text-light my-2 "
              data-test="input"
              maxlength="100"
              placeholder="Address 1"
              type="text"
              value={checkoutDetails.address1}
              onChange={(e) => onChangeHandler(e, "address1")}
            />
            <input
              name="address2"
              aria-label="address2"
              className="w-100 p-2 m-0 bg-transparent text-light my-2 "
              data-test="input"
              maxlength="100"
              placeholder="Address 2"
              type="text"
              value={checkoutDetails.address2}
              onChange={(e) => onChangeHandler(e, "address2")}
            />
            <input
              name="country"
              aria-label="country"
              className="w-100 p-2 m-0 bg-transparent text-light my-2 "
              data-test="input"
              maxlength="100"
              placeholder="Country"
              type="text"
              value={checkoutDetails.country}
              onChange={(e) => onChangeHandler(e, "country")}
            />
            <Row className="justify-content-between">
              <div className="col-md-4">
                <input
                  name="postalCode"
                  aria-label="postalCode"
                  className="w-100 p-2 m-0 bg-transparent text-light my-2 "
                  data-test="input"
                  maxlength="100"
                  placeholder="Postal Code"
                  type="number"
                  value={checkoutDetails.postalCode}
                  onChange={(e) => onChangeHandler(e, "postalCode")}
                />
              </div>
              <div className="col-md-4">
                <input
                  name="city"
                  aria-label="city"
                  className="w-100 p-2 m-0 bg-transparent text-light my-2 "
                  data-test="input"
                  maxlength="100"
                  placeholder="City"
                  type="text"
                  value={checkoutDetails.city}
                  onChange={(e) => onChangeHandler(e, "city")}
                />
              </div>

              <div className="col-md-4">
                <input
                  name="state"
                  aria-label="state"
                  className=" w-100 p-2 m-0 bg-transparent text-light my-2 "
                  data-test="input"
                  maxlength="100"
                  placeholder="State"
                  type="text"
                  value={checkoutDetails.state}
                  onChange={(e) => onChangeHandler(e, "state")}
                />
              </div>

            </Row>
            <input
              name="phoneNumber"
              aria-label="phoneNumber"
              className="w-100 p-2 m-0 bg-transparent text-light my-2 "
              data-test="input"
              maxlength="100"
              placeholder="Phone Number"
              type="number"
              value={checkoutDetails.phoneNumber}
              onChange={(e) => onChangeHandler(e, "phoneNumber")}
            />


            {/* <Button form="submit" className="w-100 cart-btn" onClick={placeOrder}>
              Place Order
            </Button> */}
          </Form>

          {/* <PayPalScriptProvider options={{ clientId: "ARtzp4j6JfEKnyvbfahLenE10jyG_T1fzl29MSLnW34w9pcR7qkMDU4l1RuFV_QyM_IzX9fuW3so1NYe" }}>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: "1.99",
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  const name = details.payer.name.given_name;
                  alert(`Transaction completed by ${name}`);
                });
              }}
            />
          </PayPalScriptProvider> */}

          <PayPalButton product = {cartDetail} />


        </Col>
        <Col sm={12} md={6} className="p-5">
          <div>
            {(cartDetail || []).map((item) => (
              <div className="d-flex justify-content-between align-items-end align-items-md-center checkout-box mb-4">
                <div className="d-flex align-items-center flex-wrap">
                  <div className="position-relative">
                    <img
                      src={item.image ? item.image : Ball}
                      className="me-2"
                      alt="img not found"
                    />
                    <Badge className="rounded-circle" bg="#fff" color="#000">
                      {item.quantity ? item.quantity : 0}
                    </Badge>
                  </div>
                  <div className="mt-3 mt-md-0">
                    <h5 className="body-heading fw-medium m-0 p-0 text-white">
                      {item.name ? item.name : "Product Name"}
                    </h5>
                    <span className="cart-gray p-0 m-0">
                      Item: {item.variant.name}
                    </span>
                    {/* <span className="text-gray p-0 m-0">
                      Unit Price: €{formatPrice(item.variant.price)}
                    </span> */}
                  </div>
                </div>
                <div className="d-flex flex-column">
                  <h5 className="body-heading fw-medium text-white">
                    € {formatPrice(item.variant.price) + ' * ' + item.quantity + '    '} =
                  </h5>
                  <h5 className="body-heading fw-medium text-white">
                    € {formatPrice(item.variant.price) * item.quantity}
                  </h5>

                  {/* <CloseButton
                    className="mx-2 p-1 bg-light"
                    size="lg"
                    variant="danger"
                    onClick={() => handleRemoveData(item.id)}
                  /> */}
                </div>
              </div>
            ))}
            <div className="border-top-bottom border-white py-4 mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="body-heading fw-normal text-white">Subtotal</h5>
                <div>
                  <h5 className="body-heading fw-medium text-white">€ {subtotal}</h5>
                </div>
              </div>
              {/* <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="body-heading fw-normal text-white">VAT</h5>
                <div>
                  <h5 className="body-heading fw-medium text-white">{VAT}</h5>
                </div>
              </div> */}
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="body-heading fw-normal text-white">Shipping</h5>
                <div>
                  <h5 className="body-heading fw-medium text-white">€ {shipping.toFixed(2)}</h5>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="body-heading fw-medium text-white">Total</h5>
              <div>
                <h5 className="body-heading fw-medium text-white">€ {total}</h5>
              </div>
            </div>
          </div>
        </Col>
        <Button form="submit" className="w-100 cart-btn" onClick={placeOrder}>
              Place Order
            </Button>
      </Row>
      
      <Toaster />
    </Container>
  );
};

export default CheckoutPage;
