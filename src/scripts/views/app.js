import routes from '../routes/routes'
import UrlParser from '../routes/url-parser'
import DrawerInitiator from '../utils/drawer-initiator'

class App {
    constructor ({ navbar, content, footer, skipToContentButton }) {
        this._navbar = navbar
        this._content = content
        this._footer = footer
        this._skipToContentButton = skipToContentButton

        this.initialAppShell()
    }

    initialAppShell () {
        // init skip to content
        this._skipToContentButton.addEventListener('click', () => this._content.querySelector('button, a').focus())

        // init scroll to top when go to new page
        document.addEventListener('click', event => {
            if (event.target.tagName === 'A' && event.target.getAttribute('href')) setTimeout(() => window.scrollTo(0, 0))
        })

        DrawerInitiator.init(this._navbar)
    }

    async renderPage () {
        this.clearOfflineAlert()

        const url = UrlParser.parseActiveUrlWithCombiner()
        const page = routes[url]
        this._content.innerHTML = await page.render()
        await page.afterRender(this._content)
    }

    clearOfflineAlert () {
        document.querySelectorAll('offline-alert, alert-backdrop').forEach(element => element.remove())
    }
}

export default App
