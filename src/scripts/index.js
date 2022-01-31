import 'regenerator-runtime'

import '../styles/main.scss'
import '../styles/elements.scss'
import '../styles/components.scss'
import '../styles/animation.scss'
import '../styles/responsive.scss'

import './components/resto-card'
import './components/i-icon'
import './components/nav'
import './components/footer'

import App from './views/app'
import swRegister from './utils/sw-registration'

const app = new App({
    navbar: document.querySelector('nav'),
    content: document.querySelector('#main-content'),
    footer: document.querySelector('footer'),
    skipToContentButton: document.querySelector('.skip2content')
})

window.addEventListener('hashchange', () => {
    app.renderPage()
})

window.addEventListener('DOMContentLoaded', () => {
    app.renderPage()
    swRegister()
})
