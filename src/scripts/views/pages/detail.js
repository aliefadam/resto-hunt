import FavoritRestaurantIDB from "../../data/favorite-restaurant-idb";
import RestaurantSource from "../../data/restaurant-source";
import UrlParser from "../../routes/url-parser";
import AddReviewInitiator from "../../utils/add-review-initiator";
import LikeButtonInitiator from "../../utils/like-button-initiator";

import {
  createAddReviewTemplate,
  createRestaurantDetailLoadingIndicatorTemplate,
  createRestaurantDetailTemplate,
} from "../templates/template-creator";

const Detail = {
  async render() {
    return `
    <main id="main-content-detail"></main>
    ${createAddReviewTemplate()}
    <div id="like-button-container"></div>
    `;
  },

  async afterRender() {
    AddReviewInitiator.init({
      overlay: document.getElementById("overlay-add-review"),
      box: document.querySelector(".box-add-review"),
      btnClose: document.getElementById("btn-close-add-review"),
      form: document.getElementById("add-review-form"),
      content: document.getElementById("main-content-detail"),
    });

    this._showLoading();
    this._afterLoading();
  },

  _showLoading() {
    document.getElementById("main-content-detail").innerHTML =
      createRestaurantDetailLoadingIndicatorTemplate();
  },

  _afterLoading() {
    setTimeout(async () => {
      const id = UrlParser.parseActiveUrlWithoutCombiner().id;
      await RestaurantSource.detail_restaurant(id).then((restaurant) => {
        document.getElementById("main-content-detail").innerHTML =
          createRestaurantDetailTemplate(restaurant);
        this._renderLikeButton(restaurant);
      });
    }, 500);
  },

  _renderLikeButton(restaurant) {
    LikeButtonInitiator.init({
      likeButtonContainer: document.getElementById("like-button-container"),
      restaurant,
      favoriteRestaurants: FavoritRestaurantIDB,
    });
  },
};

export default Detail;
