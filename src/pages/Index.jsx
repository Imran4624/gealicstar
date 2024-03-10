import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import BannerImage from "../assets/images/banner-img.svg";
import GaelicStar from "../assets/images/gaelic-star-img.svg";
import GaelicStarText from "../assets/images/text-img.svg";
import Ball from "../assets/images/ball-img.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import { GetRequest, PostRequest } from "../utils/api";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  cartData,
  cartDetails,
} from "../app/features/gaelicStar/cartData.slice";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [joinNews, setJoinNews] = useState({
    email: "",
    firstName: "",
    lastName: "",
    message: "",
  });
  const cartDetail = useSelector(cartData);

  const dispatch = useDispatch();

  const imgRef = useRef(null);

  const joinNewsHandle = async () => {
    const data = {
      email: joinNews.email,
    };
    joinNews.email === ""
      ? toast.error("Please add email")
      : await PostRequest("api/join/newsletter", data).then((res) => {
          console.log("join us : ", res);
          if (res.status) {
            toast.success("Join successfully");
          }
        });
  };
  const getProducts = async () => {
    setLoading(true);

    await GetRequest("api/products").then((res) => {
      if (res?.status) {
        setLoading(false);
        setProducts(res?.data?.products);
        console.log("all Products : ", res?.data);
      } else {
        setLoading(false);
        console.log("all Products error: ", res?.error);
      }
    });
  };
  const navigateTo = (ref, slug) => {
    window.location.href = `/${ref}/${slug}`;
  };
  const addCartHandle = (product, index) => {
    const name = product.variants[index].name;
    const price = product.variants[index].price;
    const selectedItem = {
      id: product?.id,
      name: product?.title,
      price: product?.price,
      color: product?.color[0],
      size: product?.size[0],
      variant: { name: name, price: price },
      image: product?.image,
      quantity: "1",
    };

    const cart = [];
    const filteredData = (cartDetail || []).filter(
      (item) => item.id !== selectedItem.id
    );
    cart.push(...filteredData, selectedItem);
    dispatch(cartDetails(cart), toast.success("Product is added to cart"));
  };

  useEffect(() => {
    getProducts();
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: imgRef.current,
        start: "top 80%", // Adjust the start position as needed
        end: "top 20%", // Adjust the end position as needed
        scrub: true,
      },
    });

    tl.from(imgRef.current, { x: -200 }); // Adjust the initial position as needed
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <section className="banner-sec">
        <div className="container">
          <div className="row align-items-center justify-content-between flex-md-row flex-column-reverse">
            <div className="col-md-5">
              <span className="sub-heading text-white d-md-block d-none">
                Welcome to the home of
              </span>
              <h1 className="main-heading text-green d-md-block d-none">
                Gaelic Star
              </h1>
              <h1 className="main-heading text-green d-md-none d-block">
                <span className="text-white">Welcome to the home of </span>
                Gaelic Star
              </h1>
              <p className="p-heading text-white">
                We supply top quality Sliotars, Gaelic Footballs and GAA
                accessories at competitive prices. All online orders receive
                free shipping throughout Ireland.
              </p>
              <Button className="btn-main">View Products</Button>
            </div>
            <div className="col-9 col-md-6 col-lg-5 justify-content-end d-flex">
              <img
                className="w-100"
                src={BannerImage}
                alt="banner-img"
                data-aos="fade-right"
                data-aos-offset="100"
                data-aos-easing="ease-in-sine"
                data-aos-duration="900"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="gaelic-start-sec">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-6 col-lg-4 mb-md-0 mb-5">
              <img className="w-100" src={GaelicStar} alt="img-not-found" />
            </div>
            <div className="col-md-6 col-lg-5">
              <h2 className="main-heading d-md-none d-block text-white">
                Gaelic Star
              </h2>
              <img
                className="mb-3 mb-lg-5 w-100 d-md-block d-none"
                src={GaelicStarText}
                alt="Gaelic Star"
                ref={imgRef}
              />
              <p className="p-heading text-white">
                is a small family business in South Offaly that lives and
                breathes GAA. We are dedicated to the development and supply of
                the best quality Sliotars, Gaelic Footballs and GAA accessories.
                Our main pride is maintaining top quality products at
                competitive prices.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="special-offer bg-white">
        <div className="container">
          <span className="sub-heading text-balck">
            Gaelic Star - Products{" "}
          </span>
          <h2 className="main-heading text-black">Special Offers</h2>
          <p className="p-heading text-black w-md-50">
            We provide best quality hurling balls. No one can compete with us on
            price.
          </p>

          <div className="row pt-5 justify-content-center">
            <div className="col-lg-10 justify-content-md-between justify-content-center d-flex">
              <div className="row justify-content-between w-100 mb-md-0 mb-10">
                {products.map((item, index) => (
                  <div className="col-md-5 mb-2">
                    <div>
                      <div
                        data-aos="fade-down"
                        data-aos-offset="200"
                        data-aos-easing="ease-in-sine"
                        data-aos-duration="900"
                        onClick={() => navigateTo("store/product", item.slug)}
                      >
                        <img
                          className="w-100"
                          src={item?.image ? item?.image : Ball}
                          alt="img-not-found"
                        />
                      </div>
                      <div>
                        <h4 className="body-heading text-balck mt-3 mb-1">
                          {item?.title ? item?.title : "Product Title"}
                        </h4>
                        <div className="w-100  ">
                          {(item?.variants || []).map((variant, index) => (
                            <div className="d-flex w-100 justify-content-between align-items-center">
                              <div>
                                <h6 className="fw-bold ">
                                  {variant.name} - {variant.price} €
                                </h6>
                                {/* <h6 className="fw-bold ">{item.price} € </h6> */}
                              </div>
                              <Button
                                onClick={() => addCartHandle(item, index)}
                                className="cart-btn mt-1 w-25"
                              >
                                Add Cart
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* <h6 className="fw-bold">
                      {item?.variants[1].name ? item?.variants[1].name : "0"}  in Only  €{item?.variants[1].price ? item?.variants[1].price : "0"}
                    </h6> */}

                    {/* <p className="p-heading text-balck mb-1">
                      {item?.description ? item?.description : "Product Description"}
                    </p> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="news-letter bg-white">
        <div className="container">
          <h2 className="main-heading text-balck text-center m-0">
            Newsletter
          </h2>
          <p className="p-heading text-black text-center m-0 p-0">
            Sign up with your email address to receive news about special
            offers.
          </p>
          <div className="row justify-content-center mt-5">
            <div className="col-md-10">
              <Form>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      value={joinNews.firstName}
                      onChange={(e) =>
                        setJoinNews({ ...joinNews, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      value={joinNews.lastName}
                      onChange={(e) =>
                        setJoinNews({ ...joinNews, lastName: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      value={joinNews.email}
                      onChange={(e) =>
                        setJoinNews({ ...joinNews, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <Form.Control
                      placeholder="Message"
                      as="textarea"
                      rows={2}
                    />
                  </div>
                </div>
                <div className="row justify-content-end">
                  <div className="col-md-6 ">
                    <Button
                      className="bg-black text-white w-100 b-0"
                      onClick={() => joinNewsHandle()}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </section>
      <Toaster />
    </>
  );
};

export default Index;
