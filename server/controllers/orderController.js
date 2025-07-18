import Order from "../models/order.js";
import Product from "../models/product.js";
import User from "../models/User.js";

// ✅ Place Order - COD
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    if (!address || !items || items.length === 0) {
      return res.json({
        success: false,
        message: "Invalid Data",
      });
    }

    let amount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({
          success: false,
          message: `Product not found: ${item.product}`,
        });
      }
      amount += product.offerPrice * item.quantity;
    }

    // Add 2% tax
    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    return res.json({
      success: true,
      message: "Order Placed Successfully",
    });

  } catch (error) {  
    console.error(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Place Order - Stripe
import Stripe from 'stripe';

export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    const { origin } = req.headers;

    if (!address || !items || items.length === 0) {
      return res.json({
        success: false,
        message: "Invalid Data",
      });
    }

    let productData = [];
    let amount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({
          success: false,
          message: `Product not found: ${item.product}`,
        });
      }

      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });

      amount += product.offerPrice * item.quantity;
    }

    // Add 2% tax
    amount += Math.floor(amount * 0.02);

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
    });

    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    const lineItems = productData.map(item => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.floor(item.price * 1.02 * 100), // price + 2% tax
      },
      quantity: item.quantity,
    }));

    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata : {
        orderId: order._id.toString(),
        userId
      }
    });

    return res.json({
      success: true,
      url: session.url,
    });

  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

  // Stripe Gateway Protocol

export const stripeWebHooks = async (req, res) => {
  const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id; // ❗ Fixed: 'id', not 'Id'

      // Get the session associated with the payment intent
      const sessions = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
        limit: 1 // ✅ safer to limit to 1 result
      });

      const session = sessions.data[0];
      if (!session || !session.metadata) {
        console.error("Session or metadata not found.");
        break;
      }

      const { orderId, userId } = session.metadata;

      // Mark order as paid
      await Order.findByIdAndUpdate(orderId, { isPaid: true });

      // Clear user's cart
      await User.findByIdAndUpdate(userId, { cartItems: {} });

      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      const sessions = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
        limit: 1
      });

      const session = sessions.data[0];
      if (!session || !session.metadata) {
        console.error("Session or metadata not found.");
        break;
      }

      const { orderId } = session.metadata;

      // Delete the failed order
      await Order.findByIdAndDelete(orderId);

      break;
    }

    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
};


// ✅ Get Orders by userId
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }]
    })
    .populate("items.product")
    .populate("address")
    .sort({ createdAt: -1 });

    return res.json({
      success: true,
      orders,
    });

  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }]
    })
    .populate("items.product")
    .populate("address")
    .sort({ createdAt: -1 });

    return res.json({
      success: true,
      orders,
    });

  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
