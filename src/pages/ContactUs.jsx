import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Toaster, toast } from "react-hot-toast";
import { PostRequest } from "../utils/api";

const ContactUs = () => {
  const [contactDetails, setContactDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const contactUsHandle = async () => {
    const userData = {
      email: contactDetails.email,
      name: contactDetails.firstName,
      subject: contactDetails.subject,
      message: contactDetails.message,
    };
    contactDetails.email === ""
      ? toast.error("Please add email")
      : contactDetails.firstName === ""
        ? toast.error("Please add First Name")
        : contactDetails.subject === ""
          ? toast.error("Please add Subject")
          : contactDetails.message === ""
            ? toast.error("Please add Message")
            : await PostRequest("api/contact-us", userData).then((res) => {
              console.log("join us : ", res);
              if (res.status) {
                toast.success("Join successfully");
              }
            });
  };
  return (
    <>
      <section className="banner-sec">
        <div className="container">
          <span className="sub-heading text-white text-center d-block">
            Gaelic Star - Contact Us
          </span>
          <h1 className="main-heading text-green text-center">Contact Us</h1>
        </div>
      </section>
      <section className="contact-us bg-white">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-5">
              <p className="body-heading">
                <span className="fw-normal">Email:</span> gaelicstar@gmail.com
              </p>
              <p className="body-heading">
                <span className="fw-normal">Phone:</span> +353 85 161 9942
              </p>
              <p className="body-heading mb-5">
                <span className="fw-normal">Address:</span>76 Ranelagh Road Dublin
              </p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12976.81945746489!2d74.29979569948658!3d31.59133787822475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1687205685313!5m2!1sen!2s"
                width="100%"
                height="350"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="col-md-6">
              <Form className="contact-us-box p-4">
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-4">
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        value={contactDetails.firstName}
                        onChange={(e) =>
                          setContactDetails({
                            ...contactDetails,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-4">
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        value={contactDetails.lastName}
                        onChange={(e) =>
                          setContactDetails({
                            ...contactDetails,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-12">
                    <Form.Group className="mb-4">
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        value={contactDetails.email}
                        onChange={(e) =>
                          setContactDetails({
                            ...contactDetails,
                            email: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-12">
                    <Form.Group className="mb-4">
                      <Form.Control
                        type="text"
                        placeholder="Subject"
                        value={contactDetails.subject}
                        onChange={(e) =>
                          setContactDetails({
                            ...contactDetails,
                            subject: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-12">
                    <Form.Group
                      className="mb-4"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Message"
                        value={contactDetails.message}
                        onChange={(e) =>
                          setContactDetails({
                            ...contactDetails,
                            message: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </div>
                </div>
              </Form>
              <button
                className="cart-btn form-btn bg-green text-white px-5 mt-4"
                onClick={() => contactUsHandle()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </section>
      <Toaster />
    </>
  );
};

export default ContactUs;
