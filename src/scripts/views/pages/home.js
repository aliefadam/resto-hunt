import RestaurantSource from "../../data/restaurant-source";
import {
  createHeroSection,
  createRestauranLoadingIndicatorTemplate,
  createRestaurantItemTemplate,
  createRestaurantNotFoundTemplate,
} from "../templates/template-creator";

const Home = {
  async render() {
    return `
    ${createHeroSection()}
    <main id="main-content">
        <h2 tabindex="0" class="poppins-semibold">Jelajahi Restoran Kami</h2>
        <div class="search-input">
          <i class="fa-regular fa-magnifying-glass"></i>
          <input type="text" id="search" placeholder="Cari Restoran..">
        </div>
        <div id="menu-container"></div>
    </main>
    `;
  },

  async afterRender() {
    this._show();

    document
      .getElementById("search")
      .addEventListener("input", ({ target }) => {
        const query = target.value;
        if (query === "") {
          this._show();
        } else {
          this._show(query);
        }
      });
  },

  async _show(query = "") {
    document.getElementById("menu-container").innerHTML =
      createRestauranLoadingIndicatorTemplate();

    setTimeout(async () => {
      const restaurantsResults =
        query === ""
          ? RestaurantSource.restaurant_list()
          : RestaurantSource.search_restaurant(query);

      await restaurantsResults.then((restaurants) => {
        document.getElementById("menu-container").innerHTML = "";
        if (restaurants.length !== 0) {
          restaurants.forEach((restaurant) => {
            document.getElementById("menu-container").innerHTML +=
              createRestaurantItemTemplate(restaurant);
          });
        } else {
          document.getElementById("menu-container").innerHTML =
            createRestaurantNotFoundTemplate();
        }
      });
    }, 500);
  },
};

export default Home;
