import React, { Component } from "react";
import BookingModal from "./bookingModal";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import getConfig from "next/config";

class BookingModalWrapper extends Component {
  constructor() {
    super();
    this.state = {
      stripePromise: null
    };
  }

  componentDidMount() {
    // (componentDidMount only fires in browser/DOM environment)
    let stripePublicKey = getConfig().publicRuntimeConfig.stripe.publicKey;

    this.setState({
      stripePromise: loadStripe(stripePublicKey)
    });
  }

  render() {
    if (this.props.req) {
      return (
        <Elements
          stripe={this.state.stripePromise}
          options={{clientSecret: this.props.req.paymentRequestSecret}}
        >
          <BookingModal {...this.props} />
        </Elements>
      );
    }

    return null;
  }
}
export default BookingModalWrapper;
