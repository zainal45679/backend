import stripePackage from "stripe";
import { productModel } from "../../models/product-model";
import { OrderModel } from "../../models/order-model";
import { serverError } from "../../utils/errorHandler";

export const orderDetails = async (req, res, next) => {
  try {
    const stripe = stripePackage(env.STRIPE_SECRET_KEY);

    const { userId } = req.user;

    const { billingDetails, cartItems } = req.body;

    const shippingCost = 20;

    if (!cartItems) {
      return res.status(201).json({
        success: false,
        message: "Cart is empty",
        data: {},
      });
    }
    const productsIds = cartItems.map((item) => item.id);
    const matchedProducts = [];

    for (const productId of productsIds) {
      const products = await productModel.find({ _id: productId }).lean();
      matchedProducts.push(...products);
    }

    if (matchedProducts.length !== cartItems.length) {
      return res.status(201).json({
        success: false,
        message: "All products are not found",
        data: {},
      });
    }

    let total = 0;
    const items = [];

    cartItems.map((cartItem) => {
      const price = matchedProducts.find(
        (item) => item._id.toString() === cartItem._id.toString(),
      )?.price;

      items.push({
        productId: cartItem._id,
        quantity: cartItem.quantity,
        price: price,
        subTotal: price * cartItem.quantity,
      });

      total = total + cartItem.quantity * price;
    });

    const grandTotal = total + shippingCost;

    const {
      firstName,
      lastName,
      emailAddress,
      address,
      country,
      pinCode,
      phoneNumber,
    } = billingDetails;

    const order = await OrderModel.create({
      userId,
      items,
      total,
      shippingTotal: shippingCost,
      grandTotal,
      billingDetails: {
        firstName,
        lastName,
        emailAddress,
        address,
        country,
        pinCode,
        phoneNumber,
      },
    });

    const customer = await stripe.customers.create({
        name: `${firstName} ${lastName}`,
        address: {
            country: billingDetails.country,
            postal_code: billingDetails.pinCode,
            line1: billingDetails.address
        },
        email: billingDetails.emailAddress,
        phone: billingDetails.phone,
    })

    const paymentIntents = await stripe.paymentIntents.create({
        amount: grandTotal * 100,
        currency: "inr",
        customer: customer._id,
        automatic_payment_methods: {
            enabled: true
        },
        metadata: { order: order._id.toString()},
        shipping: {
            name: `${firstName} ${lastName}`,
            address: {
                country: billingDetails.country,
                postal_code: billingDetails.pinCode,
                line1: billingDetails.address,
            },
        },
        receipt_email: emailAddress,
    });

    return res.status(200).json({
        success: true,
        message: "Order Created fetched",
        data: {
            amount: grandTotal,
            total: total,
            shippingCost: shippingCost,
            orderId: order._id,
            sessionId: paymentIntents.client_secret,
        }
    })
  } catch (error) {
    next(serverError(error))
  }
};
