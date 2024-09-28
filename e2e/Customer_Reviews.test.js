const assert = require("assert");

Feature("Customer Reviews");

Before(({ I }) => {
  I.amOnPage("/");
});

Scenario("give a restaurant review", async ({ I }) => {
  I.waitForElement(".btn-lihat-detail", 5);
  I.seeElement(".btn-lihat-detail");
  I.click(locate(".btn-lihat-detail").first());

  I.waitForElement(".review-body-item", 5);
  const visibleCustomerReviews = await I.grabNumberOfVisibleElements(
    ".review-body-item"
  );
  const expectedAfterReview = visibleCustomerReviews + 1;

  I.waitForElement("#add-review", 5);
  I.click("#add-review");

  const customerReview = {
    name: "Bagas",
    review: "Restoran Keren!!",
  };

  I.waitForElement("input#nama", 5);
  I.fillField("input#nama", customerReview.name);

  I.waitForElement("textarea#ulasan", 5);
  I.fillField("textarea#ulasan", customerReview.review);

  I.waitForElement("#btn-send-review", 5);
  I.click("#btn-send-review");

  I.waitForElement(".swal2-confirm", 5);
  I.click(".swal2-confirm");

  const visibleCustomerReviewsAfterReview = await I.grabNumberOfVisibleElements(
    ".review-body-item"
  );

  assert.strictEqual(expectedAfterReview, visibleCustomerReviewsAfterReview);

  I.waitForElement(".review-body-item", 5);
  I.waitForElement(".review-body-item-header", 5);
  I.waitForElement(".review-body-item-body", 5);
  const lastElementReview = locate(".review-body-item").last();
  const expectedCustomerReview = {
    name: await I.grabTextFrom(
      lastElementReview.find(".review-body-item-header h4")
    ),
    review: await I.grabTextFrom(
      lastElementReview.find(".review-body-item-body p")
    ),
  };

  const customerReviewString = JSON.stringify(customerReview);
  const expectedCustomerReviewString = JSON.stringify(expectedCustomerReview);

  assert.strictEqual(customerReviewString, expectedCustomerReviewString);
});
