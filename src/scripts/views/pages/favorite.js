import FavoritRestaurantIDB from "../../data/favorite-restaurant-idb";
import {
  createBreadCrum,
  createEmptyFavoriteRestaurantTemplate,
  createRestauranLoadingIndicatorTemplate,
  createRestaurantFavoriteTemplate,
} from "../templates/template-creator";

import FavoriteRestaurantView from "./favorite-restaurant-view";
import FavoriteRestaurantShowPresenter from "./favorite-restaurant-show-presenter";
import FavoriteRestaurantSearchPresenter from "./favorite-restaurant-search-presenter";

const view = new FavoriteRestaurantView();

const Favorite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    this._showLoading();
    setTimeout(() => {
      this._afterLoading();
    }, 500);
  },

  _showLoading() {
    document.getElementById("main-favorite-list").innerHTML =
      createRestauranLoadingIndicatorTemplate();
  },

  _afterLoading() {
    document.getElementById("main-favorite-list").innerHTML = "";
    // const restaurants = await FavoritRestaurantIDB.getAllRestaurant();
    // if (restaurants.length === 0) {
    //   document.getElementById("main-favorite-list").innerHTML =
    //     createEmptyFavoriteRestaurantTemplate();
    // } else {
    //   new FavoriteRestaurantShowPresenter({
    //     view,
    //     favoriteRestaurants: FavoritRestaurantIDB,
    //   });
    //   new FavoriteRestaurantSearchPresenter({
    //     view,
    //     favoriteRestaurants: FavoritRestaurantIDB,
    //   });
    // }

    new FavoriteRestaurantShowPresenter({
      view,
      favoriteRestaurants: FavoritRestaurantIDB,
    });
    new FavoriteRestaurantSearchPresenter({
      view,
      favoriteRestaurants: FavoritRestaurantIDB,
    });
  },
};

export default Favorite;
