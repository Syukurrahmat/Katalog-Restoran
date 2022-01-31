import barsSVG from '@fortawesome/fontawesome-free/svgs/solid/bars.svg'
import timesSVG from '@fortawesome/fontawesome-free/svgs/solid/times.svg'

const DrawerInitiator = {
    init (navbar) {
        this._navbar = navbar
        this._brand = this._navbar.querySelector('.brand')
        this._navMenu = this._navbar.querySelector('.nav-menu')
        this._hamburgerButton = this._navbar.querySelector('.hamburger')

        this._whenResize()
        window.addEventListener('resize', () => this._whenResize())

        this._hamburgerButton.addEventListener('click', (event) => {
            event.stopPropagation()
            this._hamburgerButton.dataset.open === '0' ? this._openDrawer() : this._closeDrawer()
        })
    },

    _openDrawer () {
        this._navbar.style.height = '220px'
        this._hamburgerButton.dataset.open = 1
        this._hamburgerButton.innerHTML = /* html */ `<span is="i-icon">${timesSVG}</span>`
        this._hamburgerButton.setAttribute('aria-label', 'Tutup menu navigasi')

        for (const menu of this._navMenu.children) {
            menu.removeAttribute('tabindex')
            menu.onclick = () => this._closeDrawer()
        }
        this._brand.onclick = () => this._closeDrawer()

        document.body.onclick = (event) => {
            if (!this._navbar.contains(event.srcElement)) this._closeDrawer()
        }

        this._navbar.querySelectorAll('a, button').forEach(element => {
            element.onblur = (event) => {
                if (event.relatedTarget && !this._navbar.contains(event.relatedTarget)) this._closeDrawer()
            }
        })
    },

    _closeDrawer () {
        this._navbar.style.height = null
        this._hamburgerButton.dataset.open = 0
        this._hamburgerButton.innerHTML = /* html */ `<span is="i-icon">${barsSVG}</span>`
        this._hamburgerButton.setAttribute('aria-label', 'Buka menu navigasi')

        for (const menu of this._navMenu.children) {
            menu.setAttribute('tabindex', '-1')
            menu.onclick = null
        }

        this._brand.onclick = document.body.onclick = null
        this._navbar.querySelectorAll('a,button').forEach(element => {
            element.onblur = null
        })
    },

    _whenResize () {
        const navMenuChildren = this._navMenu.children

        if (window.innerWidth < 768 && this._hamburgerButton.dataset.open === '0') {
            for (const menu of navMenuChildren) menu.setAttribute('tabindex', '-1')
        } else {
            for (const menu of navMenuChildren) menu.removeAttribute('tabindex')
        }
    }

}

export default DrawerInitiator
