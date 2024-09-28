import CONFIG from "../../global/config";

const createHeroSection = () => {
  return `
    <header>
        <picture>
          <source media="(max-width: 600px)" srcset="./images/heros/hero-image_2-small.jpg">
          <img src="./images/heros/hero-image_2-large.jpg" alt="Gambar Jumbotron">
        </picture>
        <div class="hero-content">
        <h1 tabindex="0">Selamat Datang di RestoHunt</h1>
        <p tabindex="0">
            Temukan restoran terbaik di sekitarmu dengan mudah dan cepat!.
            Nikmati pengalaman kuliner terbaik bersama kami.
        </p>
        </div>
    </header>
    `;
};

const createRestaurantItemTemplate = (restaurant) => {
  return `
    <div class="menu-item" data-restauran-id="${restaurant.id}">
        <div class="menu-image">
        <img
            class="lazyload"
            data-src="${CONFIG.BASE_IMAGE_URL(restaurant.pictureId)}"
            alt="Gambar Restoran ${restaurant.name || "-"}"
        />
        <div class="label-city poppins-medium"><i class="fa-sharp fa-solid fa-location-dot"></i>${
          restaurant.city
        }</div>
        </div>
        <div class="menu-detail">
        <p>Rating ${restaurant.rating} <i class="fa-solid fa-star"></i></p>
        <h3 class="restaurant__name">${restaurant.name || "-"}</h3>
        <p class="poppins-light desc">${
          restaurant.description
            ? restaurant.description.toString().substring(0, 90) + "..."
            : "-"
        }</p>
        <a href="#/detail/${
          restaurant.id
        }" class="btn-lihat-detail" data-restaurant-id="${
    restaurant.id
  }">Lihat Detail</a>
        </div>
    </div>
  `;
};

const createRestaurantDetailTemplate = (restaurant) => {
  return `
  <div class="bread-crumb">
    <a href="#/" class="bread-crumb-item poppins-medium">
      <i class="fa-regular fa-house"></i>
      <span>Home</span>
    </a>
    <i class="fa-regular fa-angle-right splitter"></i>
    <a href="javascript:void(0)" class="bread-crumb-item active poppins-medium">
      <span>Detail Restoran : ${restaurant.name}</span>
    </a>
  </div>

  <section id="main-detail">
    <div class="main-detail-image">
      <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL(
        restaurant.pictureId
      )}" alt="" />
    </div>
    <div class="main-detail-information">
      <h2 class="restaurant-name">${restaurant.name}</h2>
      <div class="categories">
        ${restaurant.categories
          .map((category, i) => {
            return `<span>${category.name}</span>`;
          })
          .join("")}
      </div>
      <div class="location">
        <i class="fa-regular fa-location-dot"></i>
        <span>${restaurant.address}, ${restaurant.city}</span>
      </div>
      <div class="rating">
        <i class="fa-regular fa-star"></i>
        <span>Rating ${restaurant.rating}</span>
      </div>
      <div class="description">
        <p>${restaurant.description}</p>
      </div>
    </div>
  </section>

  <div class="extras">
    <div class="menu">
      <div class="menu-header">
        <h3><i class="fa-regular fa-pot-food"></i> Menu yang tersedia</h3>
      </div>
      <div class="menu-body">
          <h4>Makanan :</h4>
          <div class="menu-body-list">
            ${restaurant.menus.foods
              .map(({ name }) => {
                return `<span>${name}</span>`;
              })
              .join("")}
          </div>
          <h4>Minuman :</h4>
          <div class="menu-body-list">
            ${restaurant.menus.drinks
              .map(({ name }) => {
                return `<span>${name}</span>`;
              })
              .join("")}
          </div>
      </div>
    </div>
    <div class="review">
      <div class="review-header">
        <h3><i class="fa-regular fa-users"></i> Ulasan Pelanggan</h3>
      </div>
      <div class="review-body">
        <button data-restaurant-id="${
          restaurant.id
        }" id="add-review"><i class="fa-regular fa-comment-plus"></i> Berikan Ulasan</button>
        ${restaurant.customerReviews
          .map(({ name, review, date }) => {
            return `
              <div class="review-body-item">
                <div class="review-body-item-header">
                  <h4>${name}</h4>
                  <span>${date}</span>
                </div>
                <div class="review-body-item-body">
                  <p>${review}</p>
                </div>
              </div>
              `;
          })
          .join("")}
      </div>
    </div>
  </div>
  `;
};

const createRestauranLoadingIndicatorTemplate = () => {
  let HTML = "";
  for (let i = 0; i < 6; i++) {
    HTML += `
    <div class="menu-item-loading">
        <div class="menu-image-loading">
          <div class="image-box-loading"></div>
          <div class="label-city-loading poppins-medium"><i class="fa-sharp fa-solid fa-location-dot"></i>Surabaya</div>
        </div>
        <div class="menu-detail-loading">
          <p>Rating 4.5 <i class="fa-solid fa-star"></i></p>
          <h3>Kafe Kita</h3>
          <p class="poppins-light desc-loading">Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ul...</p>
          <a href="#" class="btn-lihat-detail-loading">Lihat Detail</a>
        </div>
    </div>
    `;
  }
  return HTML;
};

const createRestaurantDetailLoadingIndicatorTemplate = () => {
  return `
  <div class="bread-crumb">
    <a href="#/" class="bread-crumb-item poppins-medium">
      <i class="fa-regular fa-house"></i>
      <span>Home</span>
    </a>
    <i class="fa-regular fa-angle-right splitter"></i>
    <a href="#" class="bread-crumb-item active poppins-medium">
      <span>Detail Restoran : Kafe Kita</span>
    </a>
  </div>

  <section id="main-detail-loading">
    <div class="main-detail-image-loading"></div>
    <div class="main-detail-information-loading">
      <h2 class="restaurant-name-loading">Kafe Kita</h2>
      <div class="location-loading">
        <i class="fa-regular fa-location-dot"></i>
        <span>Surabaya</span>
      </div>
      <div class="rating-loading">
        <i class="fa-regular fa-star"></i>
        <span>Rating 5</span>
      </div>
      <div class="description-loading">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quam magnam dolor. Ipsa, magni! Tenetur ratione delectus magni optio odit, laudantium laboriosam exercitationem, quia sint ipsa a, illum iste dolorum fugit ut eos! Nobis, numquam? Explicabo ratione dolores debitis veniam optio sequi laborum voluptatibus laudantium. Veritatis voluptas nulla, perspiciatis magnam harum delectus molestiae animi culpa. Nostrum corrupti deleniti voluptatum quas atque illum amet earum, iusto unde velit beatae debitis culpa consectetur saepe, odio quo eum, nam quis tempore rem odit. In suscipit libero ullam incidunt ipsum, rem ipsa, commodi totam corporis accusantium sequi quisquam reiciendis tenetur unde, praesentium id repellat.
        </p>
      </div>
    </div>
  </section>

  <div class="extras">
    <div class="menu">
      <div class="menu-header">
        <h3><i class="fa-regular fa-pot-food"></i> Menu yang tersedia</h3>
      </div>
      <div class="menu-body">
          <h4>Makanan :</h4>
          <div class="menu-body-list-loading">
            <span>asd</span>
            <span>asd</span>
            <span>asd</span>
            <span>asd</span>
            <span>asd</span>
            <span>asd</span>
          </div>
          <h4>Minuman :</h4>
          <div class="menu-body-list-loading">
            <span>asd</span>
            <span>asd</span>
            <span>asd</span>
            <span>asd</span>
            <span>asd</span>
            <span>asd</span>
          </div>
      </div>
    </div>
    <div class="review">
      <div class="review-header">
        <h3><i class="fa-regular fa-users"></i> Ulasan Pelanggan</h3>
      </div>
      <div class="review-body">
        <button id="add-review"><i class="fa-regular fa-comment-plus"></i> Berikan Ulasan</button>
        <div class="review-body-item-loading">
            <div class="review-body-item-loading-header">
              <h4>Johan</h4>
              <span>20 September 2024</span>
            </div>
            <div class="review-body-item-loading-body">
              <p>Mantap Men!!</p>
            </div>
          </div>
      </div>
    </div>
  </div>
  `;
};

const createRestaurantNotFoundTemplate = () => {
  return `
  <div class="not-found">
    <img class="lazyload" data-src="./images/no-results.png">
    <p>Restoran yang anda cari tidak ditemukan</p>
  </div>
  `;
};

const createAddReviewTemplate = () => {
  return `
  <div id="overlay-add-review">
    <div class="box-add-review">
      <div class="box-add-review-header">
        <h1>Berikan Ulasan</h1>
        <button id="btn-close-add-review" aria-label="Tombol Tutup Berikan Ulasan">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="box-add-review-body">
        <form action="" id="add-review-form">
          <div class="form-group">
            <label for="nama">Nama Anda</label>
            <input required type="text" id="nama">
          </div>
          <div class="form-group">
            <label for="ulasan">Ulasan</label>
            <textarea required id="ulasan"></textarea>
          </div>
          <div class="form-action">
            <button type="submit" id="btn-send-review">Kirim</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  `;
};

const createLikeRestaurantButtonTemplate = () => {
  return `
  <button aria-label="Tambahkan Restaurant ini ke favorit" id="btn-like" class="btn-like">
    <i class="fa-regular fa-heart"></i>
  </button>
  `;
};

const createUnlikeRestaurantButtonTemplate = () => {
  return `
  <button aria-label="Hapus Restaurant ini dari favorit" id="btn-like" class="btn-like">
    <i class="fa-solid fa-heart"></i>
  </button>
  `;
};

const createBreadCrum = () => {
  return `
  <div class="bread-crumb">
    <a href="#/" class="bread-crumb-item poppins-medium">
      <i class="fa-regular fa-house"></i>
      <span>Home</span>
    </a>
    <i class="fa-regular fa-angle-right splitter"></i>
    <a href="javascript:void(0)" class="bread-crumb-item active poppins-medium">
      <span>Restoran Favorite</span>
    </a>
  </div>
  `;
};

export {
  createHeroSection,
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createRestauranLoadingIndicatorTemplate,
  createRestaurantNotFoundTemplate,
  createRestaurantDetailLoadingIndicatorTemplate,
  createAddReviewTemplate,
  createLikeRestaurantButtonTemplate as createLikeButtonTemplate,
  createUnlikeRestaurantButtonTemplate as createLikedButtonTemplate,
  createBreadCrum,
};
