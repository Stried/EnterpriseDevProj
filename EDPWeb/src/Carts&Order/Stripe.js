const stripe = Stripe('pk_test_51OgjtNJakcaB2mxPRKjRlPGJs3MxAZy7vcEjMLihXc74dQgcKajaMcYMUAGiitmNmAQyqnSuRipkfYkIOSvCXU3F00j9ziTBk5');

const appearance = { /* appearance */ };
const options = {
  layout: {
    type: 'tabs',
    defaultCollapsed: false,
  }
};
const elements = stripe.elements({ clientSecret, appearance });
const paymentElement = elements.create('payment', options);
paymentElement.mount('#payment-element');