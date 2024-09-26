import {
  createBreadCrum,
  createRestaurantItemTemplate,
} from "../templates/template-creator";

class FavoriteRestaurantView {
  getTemplate() {
    return `
    <main id="main-content-favorite">
      ${createBreadCrum()}
      <section id="main-favorite">
        <h1>Restoran Favorit</h1>
        <input id="query" type="text">
        <div id="main-favorite-list"></div>
      </section>
    </main>;
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById("query").addEventListener("input", (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurant(restaurants) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce(
        (carry, restaurant) =>
          carry.concat(createRestaurantItemTemplate(restaurant)),
        ""
      );
    } else {
      html = this._getEmptyRestaurantTemplate();
    }
    document.getElementById("main-favorite-list").innerHTML = html;
    document
      .getElementById("main-favorite-list")
      .dispatchEvent(new Event("restaurants:updated"));
  }

  _getEmptyRestaurantTemplate() {
    return `
    <div class="restaurant-item__not__found">
      Restoran tidak ditemukan
    </div>
    `;
  }
}

export default FavoriteRestaurantView;
