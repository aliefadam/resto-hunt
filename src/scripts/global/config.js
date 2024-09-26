const CONFIG = {
  KEY: process.env.KEY,
  BASE_URL: "https://restaurant-api.dicoding.dev",
  BASE_IMAGE_URL: (id) =>
    `https://restaurant-api.dicoding.dev/images/large/${id}`,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_VERSION: process.env.DATABASE_VERSION,
  OBJECT_STORE_NAME: process.env.OBJECT_STORE_NAME,
  CACHE_NAME: new Date().toISOString(),
};

export default CONFIG;
