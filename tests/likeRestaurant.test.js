import FavoritRestaurantIDB from "../src/scripts/data/favorite-restaurant-idb";
import * as TestFactories from "./helpers/testFactories";

describe("Liking a restaurant", () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = `<div id="like-button-container"></div>`;
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it("should show the like button when the restaurant has not been liked before", async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({
      id: "rqdv5juczeskfw1e867",
    });

    expect(
      document.querySelector(
        `[aria-label="Tambahkan Restaurant ini ke favorit"]`
      )
    ).toBeTruthy();
  });

  it("should not show the unlike button when the restaurant has not been liked before", async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({
      id: "rqdv5juczeskfw1e867",
    });

    expect(
      document.querySelector(`[aria-label="Hapus Restaurant ini dari favorit"]`)
    ).toBeFalsy();
  });

  it("should be able to like the restaurant", async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({
      id: "rqdv5juczeskfw1e867",
    });

    document.querySelector("#btn-like").dispatchEvent(new Event("click"));
    const restaurant = await FavoritRestaurantIDB.getRestaurant(
      "rqdv5juczeskfw1e867"
    );
    expect(restaurant).toEqual({ id: "rqdv5juczeskfw1e867" });
    await FavoritRestaurantIDB.deleteRestaurant("rqdv5juczeskfw1e867");
  });

  it("should not add a restaurant again when its already liked", async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({
      id: "rqdv5juczeskfw1e867",
    });

    await FavoritRestaurantIDB.putRestaurant({ id: "rqdv5juczeskfw1e867" });
    document.querySelector("#btn-like").dispatchEvent(new Event("click"));

    expect(await FavoritRestaurantIDB.getAllRestaurant()).toEqual([
      {
        id: "rqdv5juczeskfw1e867",
      },
    ]);

    await FavoritRestaurantIDB.deleteRestaurant("rqdv5juczeskfw1e867");
  });

  it("should not add a restaurant when it has no id", async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({});

    document.querySelector("#btn-like").dispatchEvent(new Event("click"));
    expect(await FavoritRestaurantIDB.getAllRestaurant()).toEqual([]);
  });
});
