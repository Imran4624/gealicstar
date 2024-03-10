import React, { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Checkout from "../Components/Checkout";

const Shopping = () => {
  const [show, setShow] = useState(false);

  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];
  return (
    <>
      <section className="shopping-sec">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-6">
              <ReactImageGallery
                thumbnailPosition="left"
                disableKeyDown="false"
                showNav={false}
                items={images}
              />
            </div>
            <div className="col-md-5 mt-5 mt-md-0">
              <h5 className="text-green sub-heading">Championship Bundle</h5>
              <h6 className=" text-white py-3"> from €. 6.00 </h6>
              <p className="p-heading text-white">
                We supply top quality Sliotars, Gaelic Footballs and GAA
                accessories at competitive prices. All online orders receive
                free shipping throughout Ireland.
              </p>

              <div className="variation-box pt-4">
                <h6 className="text-white fw-bold">
                  Size 4 available while stocks last.
                </h6>
                <div className="row pt-4">
                  <div className="col-md-6 mb-3">
                    <label className="text-white fs-13 mb-2">Color</label>
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        Select Color
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Red</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Black</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="text-white fs-13 mb-2">Size</label>
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        Select Size
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Red</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Black</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="text-white fs-13 mb-2">Amout</label>
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        Select Amout
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Red</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Black</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="text-white fs-13 mb-2">Quatity</label>
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        Select Quatity
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Red</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Black</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <Button onClick={() => setShow(true)} className="cart-btn mt-3">
                  Add Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Checkout show={show} setShow={setShow} />
      </section>
    </>
  );
};

export default Shopping;
