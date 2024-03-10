import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Ball from "../assets/images/ball-img.png";
import { getProducts } from "../app/features/gaelicStar/gaelicStar.slice";
import { useDispatch, useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import api, { GetRequest } from "../utils/api";
import product from "../app/features/gaelicStar/gaelicStart.service";
import FullScreenLoader from "../authorization/FullScreenLoader";

const ProductStore = () => {
  const [allCats, setAllCats] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [Products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigateTo = (ref, slug) => {
    window.location.href = `/${ref}/${slug}`;
  };
  const getCat = async () => {
    setLoading(true);
    await GetRequest(`api/categories`).then((res) => {
      if (res?.status) {
        setAllCats(res?.data?.categories);
        setLoading(false);
      } else {
        setLoading(false);
        console.log("all categories error: ", res?.error);
      }
    });
  };
  const getTabProducts = async (slug) => {
    setLoading(true);
    const url = slug === "All" ? "api/products" : `api/products-by-category/${slug}`;
    await GetRequest(url).then((res) => {
      if (res?.status) {
        setLoading(false);
        setProducts(res?.data?.products);
      } else {
        setLoading(false);
        console.log("all Products error: ", res?.error);
      }
    });
  };
  const tabPressHandler = (slug) => {
    getTabProducts(slug);
    setActiveTab(slug);
  };
  useEffect(() => {
    dispatch(getProducts());
    getCat();
    tabPressHandler("sliotors");
    AOS.init();
  }, []);

  return (
    <>
      <section className="banner-sec">
        <div className="container">
          <span className="sub-heading text-white text-center d-block">
            Gaelic Star - Products
          </span>
          <h1 className="main-heading text-green text-center">
            Product Stores
          </h1>
        </div>
      </section>
      <section className="product-store bg-white">
        <div className="container">
          <Tabs
            transition={true}
            id="noanim-tab-example"
            className="mb-3"
            onSelect={(key) => tabPressHandler(key)}
            activeKey={activeTab}
          >

            {allCats?.map((cat, index) => (
              <Tab key={index} eventKey={cat.slug} title={cat.name}>
                <div className="row mt-5">
                  {Products.map((pro, index) => (
                    <div key={index}
                      className="col-md-6 col-lg-4 mb-3 cursor-pointer product_box"
                      onClick={() => navigateTo("store/product", pro.slug)}
                    >
                      <img
                        className="w-100"
                        src={pro.image}
                        alt="img-not-found"
                        data-aos="zoom-in"
                        data-aos-offset="200"
                        data-aos-easing="ease-in-sine"
                        data-aos-duration="900"
                      />
                      <h3 className="body-heading text-balck mt-3 mb-1">
                        {pro.title}
                      </h3>
                      <h6 className="fw-bold">from €{pro.price}</h6>
                      <p className="p-heading text-balck mb-1">
                        {pro.description}
                      </p>
                    </div>
                  ))}

                </div>
              </Tab>
            ))}
          </Tabs>
        </div>
      </section>
      {loading && <FullScreenLoader />}
    </>
  );
};

export default ProductStore;
