import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Ball from "../assets/images/ball-img.png";
import { Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  cartData,
  cartDetails,
} from "../app/features/gaelicStar/cartData.slice";

function Checkout({ show, setShow }) {
  const handleClose = () => setShow(false);
  const cartDetail = useSelector(cartData);
  const dispatch = useDispatch();

  const handleRemoveData = (id) => {
    const removedData =
      cartDetail.length != 0
        ? cartDetail?.filter((item) => item.id !== id)
        : [];
    if (removedData.length != 0) {
      dispatch(cartDetails(removedData));
    } else {
      dispatch(cartDetails(removedData));
      handleClose();
    }
  };
  console.log("redux cart details : ", cartDetail);

  return (
    <>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header className="border-0" closeButton></Modal.Header>
        <Modal.Body>
          {cartDetail?.map((item) => (
            <div
              className="d-flex justify-content-between align-items-end align-items-md-center checkout-box mb-4"
              onClick={() => handleRemoveData(item.id)}
            >
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
                  <h5 className="body-heading fw-medium m-0 p-0">
                    {item.name ? item.name : "Product Name"}
                  </h5>
                  <span className="text-gray p-0 m-0">
                    Size {item.size ? item.size : 0} - Color{" "}
                    {item.color ? item.color : "No Color"}
                  </span>
                </div>
              </div>
              <div>
                <h5 className="body-heading fw-medium">
                  € {item.variant.price ? parseFloat(item.variant.price)* item.quantity : 0}
                </h5>
              </div>
            </div>
          ))}

          <div className="border-top-bottom py-4 mb-3">
            <div className="d-flex justify-content-between mb-2">
              <h5 className="body-heading fw-normal">Subtotal</h5>
              <div>
                <h5 className="body-heading fw-medium">5,000</h5>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <h5 className="body-heading fw-normal">Subtotal</h5>
              <div>
                <h5 className="body-heading fw-medium">5,000</h5>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <h5 className="body-heading fw-medium">Total</h5>
            <div>
              <h5 className="body-heading fw-medium">5,000</h5>
            </div>
          </div>
          <Button
            onClick={() => setShow(true)}
            className="w-100 bg-black text-white rounded-3 border-0 py-3 mt-4"
          >
            Place order
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Checkout;
