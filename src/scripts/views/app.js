import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';
import DrawerInitiator from '../utils/drawer-initiator';

class App {
  constructor ({ button, drawer, content, loadingIndicator }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._loadingIndicator = loadingIndicator;

    this._initialAppShell();
  }

  _initialAppShell () {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer
    });
  }

  showLoadingIndicator () {
    this._loadingIndicator.style.display = 'initial';
  }

  hideLoadingIndicator () {
    this._loadingIndicator.style.display = 'none';
  }

  async renderPage () {
    window.scrollTo({
      top: 0
    });

    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
