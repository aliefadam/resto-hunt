import FavoriteRestaurantView from "../src/scripts/views/pages/favorite-restaurant-view";
import FavoriteRestaurantShowPresenter from "../src/scripts/views/pages/favorite-restaurant-show-presenter";

describe("Showing all favorite restaurants", () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe("When no restaurants have been liked", () => {
    it("should ask for the favorite restaurants", () => {
      const favoriteRestaurants = {
        getAllRestaurant: jest.fn().mockImplementation(() => []),
      };

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });

      expect(favoriteRestaurants.getAllRestaurant).toHaveBeenCalledTimes(1);
    });

    it("should show the information that no restaurants have been liked", (done) => {
      document
        .getElementById("main-favorite-list")
        .addEventListener("restaurants:updated", () => {
          expect(
            document.querySelectorAll(".restaurant-item__not__found").length
          ).toEqual(1);
          done();
        });

      const favoriteRestaurants = {
        getAllRestaurant: jest.fn().mockImplementation(() => []),
      };

      new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants });
    });
  });

  describe("When the favorite restaurants exist", () => {
    it("should show the restaurants", (done) => {
      document
        .getElementById("main-favorite-list")
        .addEventListener("restaurants:updated", () => {
          expect(document.querySelectorAll(".menu-item").length).toEqual(2);
          done();
        });

      const favoriteRestaurants = {
        getAllRestaurant: jest.fn().mockImplementation(() => [
          {
            id: "rqdv5juczeskfw1e867",
            name: "Melting Pot",
            description: "Restoran Melting Pot",
          },
          {
            id: "s1knt6za9kkfw1e867",
            name: "Kafe Kita",
            description: "Restoran Kafe Kita",
          },
        ]),
      };

      new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants });
    });
  });
});
