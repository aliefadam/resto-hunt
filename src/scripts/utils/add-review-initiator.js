import RestaurantSource from '../data/restaurant-source';
import { createRestaurantDetailTemplate } from '../views/templates/template-creator';
import Notification from './notification';

const AddReviewInitiator = {
  _restaurantId: '',
  _content: '',
  _customerReviews: [],

  init ({ overlay, box, btnClose, form, content }) {
    this._content = content;

    document.addEventListener('click', ({ target }) => {
      if (target.id === 'add-review') {
        this._button = target;
        const restaurantId = target.getAttribute('data-restaurant-id');
        this._openOverlay({ overlay, box, restaurantId });
      }

      if (target === overlay) {
        this._closeOverlay({ overlay, box });
      }
    });

    btnClose.addEventListener('click', () =>
      this._closeOverlay({ overlay, box })
    );

    form.addEventListener('submit', (event) =>
      this._sendReview({ event, form, overlay, box })
    );
  },

  _sendReview ({ event, form, overlay, box }) {
    event.preventDefault();
    const [inputNama, inputUlasan, submitButton] = form.elements;
    const newReviews = {
      id: this._restaurantId,
      name: inputNama.value,
      review: inputUlasan.value
    };

    submitButton.classList.add('disabled-button');
    submitButton.innerHTML = 'Tunggu...';

    setTimeout(async () => {
      const { error, message, customerReviews } =
        await RestaurantSource.add_review(newReviews);
      this._customerReviews = customerReviews;

      if (!error) {
        this._closeOverlay({ overlay, box });
      }

      Notification.show({
        title: error ? 'Error' : 'Sukses',
        text: error ? message : 'Berhasil Memberikan Ulasan',
        icon: error ? 'error' : 'success'
      });

      submitButton.classList.remove('disabled-button');
      submitButton.innerHTML = 'Kirim';

      this._showNewReview();
    }, 500);
  },

  _openOverlay ({ overlay, box, restaurantId }) {
    this._restaurantId = restaurantId;
    overlay.style.display = 'flex';
    box.style.animation = 'fadeInDown 500ms';
  },

  _closeOverlay ({ overlay, box }) {
    box.style.animation = 'fadeOutUp 500ms';
    setTimeout(() => {
      overlay.style.display = 'none';
      box.style.animation = 'fadeInDown 500ms';
    }, 400);
  },

  async _showNewReview () {
    const restaurant = await RestaurantSource.detail_restaurant(
      this._restaurantId
    );
    restaurant.customerReviews = this._customerReviews;
    this._content.innerHTML = createRestaurantDetailTemplate(restaurant);
  }
};
export default AddReviewInitiator;
