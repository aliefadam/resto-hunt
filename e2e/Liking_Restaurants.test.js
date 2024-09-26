const assert = require("assert");

Feature("Liking Restaurants");

Before(({ I }) => {
  I.amOnPage("/#/favorite");
});

Scenario("showing empty liked restaurants", ({ I }) => {
  I.seeElement("#query");
  I.see("Restoran tidak ditemukan", ".restaurant-item__not__found");
});

Scenario("liking one restaurant", async ({ I }) => {
  I.see("Restoran tidak ditemukan", ".restaurant-item__not__found");
  I.amOnPage("/");
  I.seeElement(".btn-lihat-detail");

  const firstRestaurantNameElement = locate(".restaurant__name").first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurantNameElement);

  I.click(locate(".btn-lihat-detail").first());

  I.seeElement("#btn-like");
  I.click("#btn-like");

  I.amOnPage("/#/favorite");
  I.seeElement(".menu-item");
  const likedRestaurantNameElement = locate(".restaurant__name").first();
  const likedRestaurantName = I.grabTextFrom(likedRestaurantNameElement);

  assert(firstRestaurantName, likedRestaurantName);
});
Scenario("searching restaurants", async ({ I }) => {
  I.see("Restoran tidak ditemukan", ".restaurant-item__not__found");
  I.amOnPage("/");

  I.waitForElement(".btn-lihat-detail", 3);
  I.seeElement(".btn-lihat-detail");

  const names = [];
  for (let i = 1; i <= 3; i++) {
    I.waitForElement(".btn-lihat-detail", 3);
    I.click(locate(".btn-lihat-detail").at(i));

    I.waitForElement("#btn-like", 3);
    I.seeElement("#btn-like");
    I.click("#btn-like");

    I.waitForElement(".restaurant-name", 3);
    names.push(await I.grabTextFrom(".restaurant-name"));
    I.amOnPage("/");
  }

  I.amOnPage("/#/favorite");
  I.waitForElement("#query", 3);
  I.seeElement("#query");

  I.waitForElement(".menu-item", 5);
  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements(
    ".menu-item"
  );

  assert.strictEqual(names.length, visibleLikedRestaurants);

  const searchQuery = "e";
  I.fillField("#query", searchQuery);
  I.pressKey("Enter");

  const matchingRestaurants = names.filter(
    (name) => name.indexOf(searchQuery) !== -1
  );
  const visibleSearchedLikedRestaurants = await I.grabNumberOfVisibleElements(
    ".menu-item"
  );

  assert.strictEqual(
    matchingRestaurants.length,
    visibleSearchedLikedRestaurants
  );

  I.waitForElement(".restaurant__name", 5);
  for (let i = 0; i < matchingRestaurants.length; i++) {
    const visibleName = await I.grabTextFrom(
      locate(".restaurant__name").at(i + 1)
    );
    assert.strictEqual(matchingRestaurants[i], visibleName);
  }
});
