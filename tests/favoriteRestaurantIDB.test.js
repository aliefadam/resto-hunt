import { itActsAsFavoriteRestaurantModel } from "./contracts/favoriteRestaurantContract";
import FavoritRestaurantIDB from "../src/scripts/data/favorite-restaurant-idb";

describe("Favorite Restaurant Idb Contract Test Implementation", () => {
  afterEach(async () => {
    (await FavoritRestaurantIDB.getAllRestaurant()).forEach(
      async (restaurant) => {
        FavoritRestaurantIDB.deleteRestaurant(restaurant.id);
      }
    );
  });

  itActsAsFavoriteRestaurantModel(FavoritRestaurantIDB);
});
