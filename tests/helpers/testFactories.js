import FavoritRestaurantIDB from "../../src/scripts/data/favorite-restaurant-idb";
import LikeButtonInitiator from "../../src/scripts/utils/like-button-initiator";

const createLikeButtonPresenterWithRestaurant = async (restaurant) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.getElementById("like-button-container"),
    restaurant,
    favoriteRestaurants: FavoritRestaurantIDB,
  });
};

export { createLikeButtonPresenterWithRestaurant };
