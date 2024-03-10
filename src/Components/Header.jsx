import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../assets/images/logo.svg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { PATH } from "../utils/path";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  cartData,
} from "../app/features/gaelicStar/cartData.slice";

const Header = () => {
  const cartDetail = useSelector(cartData);
  return (
    <header>
      <Navbar expand="lg">
        <Container>
          <div className="d-flex justify-content-between align-items-center w-100">
            <div>
              <Navbar.Brand>
                <Link to={PATH.Index}>
                  <img src={logo} alt="logo" />
                </Link>
              </Navbar.Brand>
            </div>
            <div>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto align-items-lg-center">
                  <Link to={PATH.Index}>Home</Link>
                  <Link to={PATH.Store}>Store</Link>
                  {/* <Link to={PATH.Shopping}>Shopping</Link> */}
                  <Link to={PATH.About_Us}>About Us</Link>
                  <Link to={PATH.Contact_Us}>Contact Us</Link>
                  {/* <Link to="#home">Login / Sign up</Link> */}
                  <div className="position-relative">
                    <Link to={PATH.Cart} className="me-0">
                      <AiOutlineShoppingCart size={30} />
                    </Link>
                    {cartDetail?.length > 0 && <div className="cart-product position-absolute">
                      <p>{cartDetail.length ? cartDetail.length : ''}</p>
                    </div>}
                  </div>
                </Nav>
              </Navbar.Collapse>
            </div>
          </div>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
