import { loadStripe } from "@stripe/stripe-js";

export default function StripeCheck() {

  const cart = {
    cart: 119
  }

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;

      const checkoutSession = await fetch("/api/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(cart)

      })

      const response = await checkoutSession.json()

      window.location = response.url;

      // const result = await stripe.redirectToCheckout({
      //     sessionId: checkoutSession.data.id,
      // });

      // if (result.error) {
      //     alert(result.error.message);
      // }
    } catch (error) {
     
    }
  };

  return (
    <div title="Donate with Checkout | Next.js + TypeScript Example">
      <div className="page-container">
        <h1>Donate with Checkout</h1>
        <p>Donate to our project 💖</p>
        <button onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}
