class LoadingIndicator extends HTMLElement {
  constructor () {
    super();
    this.render();
  }

  render () {
    this.innerHTML = '<div id="loading-indicator"></div>';
  }
}

customElements.define('loading-indicator', LoadingIndicator);
