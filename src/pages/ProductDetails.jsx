import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, Spinner } from "react-bootstrap";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Checkout from "../Components/Checkout";
import { GetRequest } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import {
  cartData,
  cartDetails,
} from "../app/features/gaelicStar/cartData.slice";
import { useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const ProductDetails = () => {
  const { param } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [selectedItem, setSelectedItem] = useState({
    id: "",
    name: "",
    price: "",
    image: "",
    color: "",
    size: "",
    variant: "",
    quantity: "1",
  });
  const [images, setImages] = useState([]);
  const cartDetail = useSelector(cartData);

  const handleDropdownChange = (value, name) => {
    setSelectedItem({
      ...selectedItem,
      [name]: value,
    });
  };


  const getProductDetails = async (slug) => {
    const url = param;
    await GetRequest(`api/product/${url}`).then((res) => {
      if (res?.status && res?.data?.product) {
        const product = res?.data?.product
        setProduct(product);
        setImages([
          {
            original: product?.image,
            thumbnail: product?.image,
          },
          {
            original: product?.image_one,
            thumbnail: product?.image_one,
          },
          {
            original: product?.image_two,
            thumbnail: product?.image_two,
          },
        ]);

        const name = product.variants[0].name
        const price = product.variants[0].price
        setSelectedItem({
          ...selectedItem,
          id: product?.id,
          name: product?.title,
          price: product?.price,
          variant: { name: name, price: price },
          image: product?.image,
        });
      } else {
        console.log("Product error: ", res.error);
      }
    });
  };
  const addCartHandle = () => {
    if (selectedItem.quantity === "") {
      toast.error("Please select quantity")
      return
    }
    if (selectedItem.variant === "") {
      toast.error("Please select amount")
      return
    }
    // if (selectedItem.size === "") {
    //   toast.error("Please select size")
    //   return
    // }
    // if (selectedItem.color === "") {
    //   toast.error("Please select color")
    //   return
    // }


    const cart = [];
    const filteredData = (cartDetail || []).filter((item) => item.id !== selectedItem.id)
    cart.push(...filteredData, selectedItem);
    dispatch(cartDetails(cart), toast.success("Product is added to cart"));
  };

  const navigateTo = (ref, slug) => {
    window.location.href = `/${ref}`;
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <>
      <section className="shopping-sec">
        {product && <div className="container">
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
              <h5 className="text-green sub-heading">{product.title}</h5>
              <h6 className=" text-white py-3"> Price €. {selectedItem?.variant?.price  * selectedItem?.quantity} </h6>
              {/* <h6 className=" text-white py-3"> Price €. {selectedItem?.variant?.name === "Single" ?( selectedItem?.variant?.price  * selectedItem?.quantity):(selectedItem?.variant?.name ==="1-Dozen (12)"?(selectedItem?.variant?.price * selectedItem?.quantity):0)} </h6> */}
              <p className="p-heading text-white">{product?.description}</p>

              <div className="variation-box pt-4">
                {/* <h6 className="text-white fw-bold">
                  Size 4 available while stocks last.
                </h6> */}
                <div className="row pt-4">
                  {/* <div className="col-md-6 mb-3">
                    <label className="text-white fs-13 mb-2">Color</label>
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        {selectedItem.color || "Select Color"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {product?.color?.map((c, index) => (
                          <Dropdown.Item
                            key={index}
                            href="#/action-1"
                            onClick={() => handleDropdownChange(c, "color")}
                          >
                            {c}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="text-white fs-13 mb-2">Size</label>
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        {selectedItem.size || "Select Size"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {product?.size?.map((s, index) => (
                          <Dropdown.Item
                            key={index}
                            href="#/action-1"
                            onClick={() => handleDropdownChange(s, "size")}
                          >
                            {s}
                          </Dropdown.Item>
                        ))}

                      </Dropdown.Menu>
                    </Dropdown>
                  </div> */}

                  <div className="col-md-6 mb-3">
                    <label className="text-white fs-13 mb-2">Amount</label>
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        {selectedItem?.variant?.name +
                          " : " +
                          selectedItem?.variant?.price || "Select Amount"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {product?.variants?.map((v, index) => (
                          <Dropdown.Item
                            key={index}
                            href="#/action-1"
                            onClick={() =>
                              handleDropdownChange(
                                { name: `${v.name}`, price: `${v.price}` },
                                "variant"
                              )
                            }
                          >
                            {v.name} ${v.price}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>


                  <div className="col-md-6 mb-3">
                    <label className="text-white fs-13 mb-2">Quantity</label>
                    <Form.Group className="mb-4 bg-transparent border-light">
                      <Form.Control
                        className="bg-transparent p-2 rounded-0 quantityInput text-light border-light"
                        type="number"
                        pattern="[0-9]*"
                        placeholder=""
                        value={selectedItem.quantity}
                        onChange={(e) => {
                          if (/^[1-9]\d*$/.test(e.target.value) || e.target.value === '') {
                            setSelectedItem({ ...selectedItem, quantity: e.target.value })
                          }
                        }}
                      />
                    </Form.Group>
                  </div>


                </div>
                <Button
                  onClick={() => addCartHandle()}
                  className="cart-btn mt-3"
                >
                  Add Cart
                </Button>
                
                <Button
                  onClick={() => navigateTo("cart")}
                  className="cart-btn mt-3"
                >
                  Buy it now 
                </Button>
              </div>
            </div>
          </div>
        </div>}
        {!product && 
        <div className="container text-center">
          <Spinner />
        </div>
        }
        {/* <Checkout show={show} setShow={setShow} /> */}
      </section>
      <Toaster />
    </>
  );
};

export default ProductDetails;
