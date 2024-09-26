import LikeButtonInitiator from "../src/scripts/utils/like-button-initiator";
import FavoritRestaurantIDB from "../src/scripts/data/favorite-restaurant-idb";
import * as TestFactories from "./helpers/testFactories";

describe("Unliking A Movie", () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = `<div id="like-button-container"></div>`;
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoritRestaurantIDB.putRestaurant({
      id: "rqdv5juczeskfw1e867",
    });
  });

  afterEach(async () => {
    await FavoritRestaurantIDB.deleteRestaurant("rqdv5juczeskfw1e867");
  });

  it("should display unlike widget when the restaurant has been liked", async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({
      id: "rqdv5juczeskfw1e867",
    });

    expect(
      document.querySelector(`[aria-label="Hapus Restaurant ini dari favorit"]`)
    ).toBeTruthy();
  });

  it("should not display like widget when the restaurant has been liked", async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({
      id: "rqdv5juczeskfw1e867",
    });

    expect(
      document.querySelector(
        `[aria-label="Tambahkan Restaurant ini ke favorit"]`
      )
    ).toBeFalsy();
  });

  it("should be able to remove liked movie from the list", async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({
      id: "rqdv5juczeskfw1e867",
    });

    document
      .querySelector(`[aria-label="Hapus Restaurant ini dari favorit"]`)
      .dispatchEvent(new Event("click"));

    expect(await FavoritRestaurantIDB.getAllRestaurant()).toEqual([]);
  });

  it("should not throw error when user click unlike widget if the unliked movie is not in the list", async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({
      id: "rqdv5juczeskfw1e867",
    });

    await FavoritRestaurantIDB.deleteRestaurant("rqdv5juczeskfw1e867");
    document
      .querySelector(`[aria-label="Hapus Restaurant ini dari favorit"]`)
      .dispatchEvent(new Event("click"));
    expect(await FavoritRestaurantIDB.getAllRestaurant()).toEqual([]);
  });
});
