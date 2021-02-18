var stripe;
var setupElements = function () {
  fetch("/publishable-key", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      return result.json();
    })
    .then(function (data) {
      stripe = Stripe(data.publishableKey);
    });
};

var createCheckoutSession = function (donation) {
  return fetch("/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }}).then(function (response) {
    return response.json();
  });
};

setupElements();
createCheckoutSession(false);

document.querySelector("#submit").addEventListener("click", function (evt) {
  evt.preventDefault();
  // Initiate payment
  createCheckoutSession(0).then(function (response) {
    stripe
      .redirectToCheckout({
        sessionId: response.checkoutSessionId,
      })
      .then(function (result) {
      })
      .catch(function (err) {
      });
  });
});
