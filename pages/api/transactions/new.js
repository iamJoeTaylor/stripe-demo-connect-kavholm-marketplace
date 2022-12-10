import shortid from 'shortid';
import storage from '../../../helpers/storage';
import stripe from '../../../helpers/stripe';
import logger from '../../../helpers/logger';
import API from '../../../helpers/api';

import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId;

  try {
    let {listingId} = req.body;

    let listing = await API.makeRequest('get', `/api/listings/${listingId}`);

    let amount = listing.totalAmount;
    // let amount = 4000; // Fixed amount to demo Affirm limits
    let currency = listing.price.currency;
    let paymentMethodTypes = ['card', 'affirm'];

    // if (currency === 'USD' && amount >= 5000 && amount < 3000000) {
    //   paymentMethodTypes.push('affirm');
    // }

    let payParams = {
      payment_method_types: paymentMethodTypes,
      amount: amount,
      currency: currency,
    };

    const paymentIntent = await stripe.paymentIntents.create(payParams);

    const transaction = {
      id: shortid.generate(),
      listingId: String(listingId),
      bookingUserId: authenticatedUserId,
      totalAmount: String(amount),
      currency: currency,
      paymentId: paymentIntent.id,
    };

    storage
      .get('transactions')
      .push(transaction)
      .write();

    let response = {
      ...transaction,
      paymentRequestSecret: paymentIntent.client_secret,
    };

    return res.status(200).json(response);
  } catch (err) {
    console.log('err', err);
    return res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
});
