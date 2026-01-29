// const Stripe = require('stripe');
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// // Create Stripe Checkout Session
// exports.createCheckoutSession = async (req, res) => {
//   try {
//     const { items } = req.body;
//     if (!items || !Array.isArray(items) || items.length === 0) {
//       return res.status(400).json({ message: 'No items provided' });
//     }
//     const line_items = items.map(item => ({
//       price_data: {
//         currency: 'usd',
//         product_data: {
//           name: item.name,
//         },
//         unit_amount: Math.round(item.price * 100),
//       },
//       quantity: item.quantity,
//     }));
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items,
//       mode: 'payment',
//       success_url: process.env.CLIENT_URL + '/checkout-success',
//       cancel_url: process.env.CLIENT_URL + '/cart',
//     });
//     res.json({ url: session.url });
//   } catch (error) {
//     res.status(500).json({ message: 'Stripe error', error: error.message });
//   }
// };
