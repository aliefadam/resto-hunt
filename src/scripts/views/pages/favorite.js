import FavoritRestaurantIDB from '../../data/favorite-restaurant-idb';
import { createRestauranLoadingIndicatorTemplate } from '../templates/template-creator';

import FavoriteRestaurantView from './favorite-restaurant-view';
import FavoriteRestaurantShowPresenter from './favorite-restaurant-show-presenter';
import FavoriteRestaurantSearchPresenter from './favorite-restaurant-search-presenter';

const view = new FavoriteRestaurantView();

const Favorite = {
  async render () {
    return view.getTemplate();
  },

  async afterRender () {
    this._showLoading();
    setTimeout(() => {
      this._afterLoading();
    }, 500);
  },

  _showLoading () {
    document.getElementById('main-favorite-list').innerHTML =
      createRestauranLoadingIndicatorTemplate();
  },

  _afterLoading () {
    document.getElementById('main-favorite-list').innerHTML = '';
    // eslint-disable-next-line no-new
    new FavoriteRestaurantShowPresenter({
      view,
      favoriteRestaurants: FavoritRestaurantIDB
    });
    // eslint-disable-next-line no-new
    new FavoriteRestaurantSearchPresenter({
      view,
      favoriteRestaurants: FavoritRestaurantIDB
    });
  }
};

export default Favorite;
