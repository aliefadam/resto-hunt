const assert = require("assert");

Feature("Unliked Restaurants");

Before(async ({ I }) => {
  I.amOnPage("/");
});

Scenario("unliked restaurant", async ({ I }) => {
  I.waitForElement(".btn-lihat-detail", 5);
  I.seeElement(".btn-lihat-detail");

  const names = [];
  for (let i = 1; i <= 2; i++) {
    I.waitForElement(".btn-lihat-detail", 5);
    I.click(locate(".btn-lihat-detail").at(i));

    I.waitForElement("#btn-like", 5);
    I.seeElement("#btn-like");
    I.click("#btn-like");

    I.waitForElement(".restaurant-name", 5);
    names.push(await I.grabTextFrom(".restaurant-name"));
    I.amOnPage("/");
  }

  I.amOnPage("/#/favorite");
  I.waitForElement(".menu-item", 5);
  I.seeElement(".menu-item");
  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements(
    ".menu-item"
  );

  assert.strictEqual(names.length, visibleLikedRestaurants);

  /*
   * Disini saya baru melakukan simulasi untuk batal menyukai restoran
   * Restoran yang saya hapus merupakan restoran yang ada pada urutan pertama
   */
  I.waitForElement(".btn-lihat-detail", 5);
  I.click(locate(".btn-lihat-detail").first());

  I.waitForElement(".restaurant-name", 5);
  const restaurantNameUnliked = await I.grabTextFrom(".restaurant-name");

  I.waitForElement(`[aria-label="Hapus Restaurant ini dari favorit"]`, 5);
  I.click(`[aria-label="Hapus Restaurant ini dari favorit"]`);
  I.amOnPage("/#/favorite");

  // disini saya memastikan bahwa restaurant tersebut sudah tidak ada dalam daftar ".menu-item"
  I.waitForElement(".menu-item", 5);
  I.seeElement(".menu-item");
  I.dontSee(restaurantNameUnliked, ".menu-item");
});
