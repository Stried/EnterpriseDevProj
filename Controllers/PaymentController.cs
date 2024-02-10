using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace EnterpriseDevProj.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly string ApiKey = "sk_test_51OgjtNJakcaB2mxPYkkBrixQs3zClZ2GinUE3qLUuvW49gZVaDuwXdwy52usaFLz1Q5Ov7rs8oXLmY2IcMI3CUzK00cPiCGqMP";

        [HttpPost("CreatePaymentIntent")]
        public IActionResult CreatePaymentIntent(PaymentIntent intent)
        {
            StripeConfiguration.ApiKey = ApiKey;

            // Create parameters for the new PaymentIntent
            var options = new PaymentIntentCreateOptions
            {
                Amount = intent.Amount,
                Currency = intent.Currency,
                AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                {
                    Enabled = true,
                },
            };

            var service = new PaymentIntentService();
            var paymentIntent = service.Create(options);
            return Ok(new { clientSecret = paymentIntent.ClientSecret });
        }

        [HttpGet("GetPaymentIntent/{paymentIntentId}")]
        public IActionResult GetPaymentIntent(string paymentIntentId)
        {
            // Initialize Stripe configuration with your API key
            StripeConfiguration.ApiKey = ApiKey;

            // Create a service instance for PaymentIntent
            var service = new PaymentIntentService();

            return Ok(service.Get(paymentIntentId));
        }
    }
}
