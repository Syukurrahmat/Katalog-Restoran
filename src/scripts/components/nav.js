import barsSVG from '@fortawesome/fontawesome-free/svgs/solid/bars.svg'

class Navbar extends HTMLElement {
    connectedCallback () {
        this.removeAttribute('is', 'i-icon')
        this.render()
    }

    render () {
        this.innerHTML = /* html */ `
        <div class="container">
            <a href="#" class="brand" aria-label="LUWE app">
                <img src="../assets/icon/brand.svg" alt="Logo LUWE">
                <b>LUWE</b>
            </a>
            <button class="hamburger" data-open="0" aria-label="Buka Menu Navigasi">
                <span is="i-icon">${barsSVG}</span>
            </button>
            <div class="nav-menu">
                <a href="#" tabindex="-1">Home</a>
                <a href="#/favorite" tabindex="-1">Favorite</a>
                <a href="https://github.com/Syukurrahmat" tabindex="-1" target="_blank" rel="noreferrer">About</a>
            </div>
        </div>
        `
    }
}

customElements.define('my-navbar', Navbar, { extends: 'nav' })
