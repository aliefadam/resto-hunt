import {
  createLikeButtonTemplate,
  createLikedButtonTemplate
} from '../views/templates/template-creator';

const LikeButtonInitiator = {
  async init ({ likeButtonContainer, restaurant, favoriteRestaurants }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;
    this._favoriteRestaurants = favoriteRestaurants;

    await this._renderButton();
  },

  async _renderButton () {
    const { id } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestaurantExist (id) {
    const restaurant = await this._favoriteRestaurants.getRestaurant(id);
    return !!restaurant;
  },

  async _renderLike () {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();
    const likeButton = this._likeButtonContainer.querySelector('#btn-like');

    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurants.putRestaurant(this._restaurant);
      this._renderButton();
    });
  },

  async _renderLiked () {
    this._likeButtonContainer.innerHTML = createLikedButtonTemplate();
    const likeButton = this._likeButtonContainer.querySelector('#btn-like');

    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurants.deleteRestaurant(this._restaurant.id);
      this._renderButton();
    });
  }
};

export default LikeButtonInitiator;
