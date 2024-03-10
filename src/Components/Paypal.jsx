import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = (props) => {
  const { product } = props;
  // console.log("paypal product : ",product);
  const [show, setShow] = useState(true);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "name",
            amount: {
              // currency_code: "USD",
              value: 50,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        // application_context: {
        //   shipping_preference: "NO_SHIPPING",
        // },
      })
      .then((orderID) => {
        setOrderID(orderID);
        console.log("order created successfully : ", orderID);
        // return orderID;
      });
  };

  // check Approval
  const handleOnApprove = (orderID) => {
    setSuccess(true)
  };
  if (success) {
    alert("thanks for purchase")
  }

  //capture likely error
  const onError = (err) => {
    console.log("error in paypal : ", err);
    setErrorMessage("An Error occured with your payment ");
  };

  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "ARtzp4j6JfEKnyvbfahLenE10jyG_T1fzl29MSLnW34w9pcR7qkMDU4l1RuFV_QyM_IzX9fuW3so1NYe",
      }}
    >
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              product?.map((pro)=>(
                {
                  description:pro.name,
                  amount: {
                    value: pro.price,
                  },
                }
              ))
            ],
          });
        }}
        onApprove={async(data, actions) => {
          const order =await actions.order.capture()
          console.log("order : ",order);

          handleOnApprove(data.orderID)

        }}
        onError={onError}
        onCancel={(data,actions)=>{

        }}
      />
    </PayPalScriptProvider>
    // <PayPalButtons
    //   style={{ color:"silver", layout: "vertical" }}
    //   createOrder={createOrder}
    //   onApprove={onApprove}
    //   onError={onError}
    // />
  );
};

export default PayPalButton;
