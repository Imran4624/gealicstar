import React from "react";
import logo from "../assets/images/logo.svg";
import { NavLink } from "react-bootstrap";
import { AiOutlineInstagram, AiFillYoutube } from "react-icons/ai";
import { FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { PATH } from "../utils/path";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row align-items-center py-4">
          <div className="col-md-4 d-flex justify-content-center d-md-none">
            <img src={logo} alt="logo" />
          </div>
          <div className="col-md-4 my-md-0 my-5 text-md-start text-center">
            <h6 className="text-white">Quick Links</h6>
            <ul className="list-unstyled mt-4 d-md-block d-flex justify-content-center">
              <li className="text-white mx-md-0 mx-4">
                <Link to={PATH.Index}>Home</Link>
              </li>
              <li className="text-white mx-md-0 mx-4">
                <Link to={PATH.Store}>Store</Link>
              </li>
              <li className="text-white mx-md-0 mx-4">
                <Link to={PATH.Shopping}>Products</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4 d-md-flex d-none justify-content-center">
            <img src={logo} alt="logo" />
          </div>
          <div className="col-md-4 d-flex justify-content-md-end justify-content-center">
            <NavLink>
              <FaLinkedinIn size={25} className="mx-3" fill="#fff" />
            </NavLink>
            <NavLink>
              <FaFacebookF size={25} className="mx-3" fill="#fff" />
            </NavLink>
            <NavLink>
              <AiOutlineInstagram size={25} className="mx-3" fill="#fff" />
            </NavLink>
            <NavLink>
              <AiFillYoutube size={25} className="mx-3" fill="#fff" />
            </NavLink>
          </div>
        </div>
      </div>
      <div className="footer-bottom bg-green py-3">
        <p className="text-black p-0 m-0 text-center">
          Copyright 2023 ©GaelicStar Pvt Ltd 2023
        </p>
      </div>
    </footer>
  );
};

export default Footer;
