class MyNavbar extends HTMLElement {
  constructor () {
    super();
    this.render();
  }

  render () {
    this.innerHTML = `
      <nav>
        <div class="brand">
            <a href="#/" class="poppins-bold">RestoHunt</a>
        </div>
        <div class="menu">
            <a href="#/"><i class="fa-regular fa-house"></i> Home</a>
            <a href="#/favorite"><i class="fa-regular fa-heart"></i> Favorite</a>
            <a href="https://aliefadam-portfolio.netlify.app/" target="_blank"
            ><i class="fa-regular fa-user"></i> About Us
            </a>
        </div>
        <button class="hamburger-menu" aria-label="Hamburger Menu">
            <i class="fa-sharp fa-solid fa-bars hamburger-menu-icon"></i>
        </button>
    </nav>
    `;
  }
}

customElements.define('my-navbar', MyNavbar);
