const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { cart } = req.body;
console.log({cart})
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {price: 'price_1NsMjtBWspi6tbQlScWddwg4', quantity: 2}
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/payment-success`,
        cancel_url: `${req.headers.origin}/payment-cancel`,
      });
console.log({session})
      res.status(200).json({url: session.url, session_id: session.id});
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}