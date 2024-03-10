import React from "react";
import Ball from "../assets/images/ball-img.png";

const AboutUs = () => {
  return (
    <>
      <section className="banner-sec">
        <div className="container">
          <span className="sub-heading text-white text-center d-block">
            Gaelic Star - About Us
          </span>
          <h1 className="main-heading text-green text-center">About Us</h1>
        </div>
      </section>
      <section className="contact-us bg-white">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-6">
              <h4 className="sub-heading text-black mb-4">
                Lorem Ipsum is simply dummy text of the.
              </h4>
              <p className="p-heading">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <p className="p-heading">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, Lorem Ipsum is simply
                dummy text of the printing and typesetting industry. Lorem Ipsum
                has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley of type Lorem Ipsum
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, Lorem Ipsum is simply dummy text of the
                printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type Lorem Ipsum is simply
                dummy text of the printing and typesetting industry. Lorem Ipsum
                has been the industry's standard dummy text ever since the
                1500s,{" "}
              </p>
            </div>
            <div className="col-md-5">
              <img className="w-100" src={Ball} alt="img not found" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
