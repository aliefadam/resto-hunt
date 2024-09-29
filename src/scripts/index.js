import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import './views/components/MyNavbar';
import './views/components/MyFooter';
import './views/components/LoadingIndicator';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import App from './views/app';
import swRegister from './utils/sw-register';

const app = new App({
  button: document.querySelector('.hamburger-menu'),
  drawer: document.querySelector('nav .menu'),
  content: document.getElementById('content'),
  loadingIndicator: document.getElementById('loading-indicator'),
  skipLink: document.getElementById('skip-link')
});

window.addEventListener('hashchange', () => {
  app.showLoadingIndicator();
  setTimeout(() => {
    app.renderPage();
    app.hideLoadingIndicator();
  }, 500);
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
