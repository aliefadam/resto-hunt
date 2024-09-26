import FavoritRestaurantIDB from "../../src/scripts/data/favorite-restaurant-idb";

const itActsAsFavoriteRestaurantModel = (favoriteRestaurant) => {
  it("should return the restaurant that has been added", async () => {
    favoriteRestaurant.putRestaurant({ id: "rqdv5juczeskfw1e867" });
    favoriteRestaurant.putRestaurant({ id: "s1knt6za9kkfw1e867" });

    expect(
      await favoriteRestaurant.getRestaurant("rqdv5juczeskfw1e867")
    ).toEqual({
      id: "rqdv5juczeskfw1e867",
    });
    expect(
      await favoriteRestaurant.getRestaurant("s1knt6za9kkfw1e867")
    ).toEqual({
      id: "s1knt6za9kkfw1e867",
    });
    expect(
      await favoriteRestaurant.getRestaurant("asdasdasdasdasdxxxxasd")
    ).toEqual(undefined);
  });

  it("should refuse a restaurant from being added if it does not have the correct property", async () => {
    favoriteRestaurant.putRestaurant({ aProperty: "property" });
    expect(await favoriteRestaurant.getAllRestaurant()).toEqual([]);
  });

  it("can return all of the restaurant that have been added", async () => {
    favoriteRestaurant.putRestaurant({ id: "rqdv5juczeskfw1e867" });
    favoriteRestaurant.putRestaurant({ id: "s1knt6za9kkfw1e867" });

    expect(await favoriteRestaurant.getAllRestaurant()).toEqual([
      {
        id: "rqdv5juczeskfw1e867",
      },
      {
        id: "s1knt6za9kkfw1e867",
      },
    ]);
  });

  it("should remove favorite restaurant", async () => {
    favoriteRestaurant.putRestaurant({ id: "rqdv5juczeskfw1e867" });
    favoriteRestaurant.putRestaurant({ id: "s1knt6za9kkfw1e867" });

    await favoriteRestaurant.deleteRestaurant("s1knt6za9kkfw1e867");
    expect(await favoriteRestaurant.getAllRestaurant()).toEqual([
      { id: "rqdv5juczeskfw1e867" },
    ]);
  });

  it("should handle request to remove a restaurant even though the restaurant has not been added", async () => {
    favoriteRestaurant.putRestaurant({ id: "rqdv5juczeskfw1e867" });
    favoriteRestaurant.putRestaurant({ id: "s1knt6za9kkfw1e867" });

    await favoriteRestaurant.deleteRestaurant("w9pga3s2tubkfw1e867");
    expect(await favoriteRestaurant.getAllRestaurant()).toEqual([
      {
        id: "rqdv5juczeskfw1e867",
      },
      {
        id: "s1knt6za9kkfw1e867",
      },
    ]);
  });

  it("should be able to search for restaurants", async () => {
    favoriteRestaurant.putRestaurant({
      id: "rqdv5juczeskfw1e867",
      name: "restoran a",
    });
    favoriteRestaurant.putRestaurant({
      id: "xxxsssdddfff",
      name: "restoran b",
    });
    favoriteRestaurant.putRestaurant({
      id: "s1knt6za9kkfw1e867",
      name: "restoran abc",
    });
    favoriteRestaurant.putRestaurant({
      id: "w9pga3s2tubkfw1e867",
      name: "ini restoran abcd",
    });

    expect(await favoriteRestaurant.searchRestaurant("restoran a")).toEqual([
      { id: "rqdv5juczeskfw1e867", name: "restoran a" },
      { id: "s1knt6za9kkfw1e867", name: "restoran abc" },
      { id: "w9pga3s2tubkfw1e867", name: "ini restoran abcd" },
    ]);
  });
};

export { itActsAsFavoriteRestaurantModel };
