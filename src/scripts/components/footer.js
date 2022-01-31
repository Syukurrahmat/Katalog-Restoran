import facebookFSVG from '@fortawesome/fontawesome-free/svgs/brands/facebook-f.svg'
import instagramSVG from '@fortawesome/fontawesome-free/svgs/brands/instagram.svg'
import twitterSVG from '@fortawesome/fontawesome-free/svgs/brands/twitter.svg'

class Footer extends HTMLElement {
    connectedCallback () {
        this.removeAttribute('is', 'i-icon')
        this.render()
    }

    render () {
        this.innerHTML = /* html */ `
            <div class="container">
                <div>
                    <a href="#" class="brand" aria-label="LUWE app">
                        <img src="../assets/icon/brand.svg" alt="Logo LUWE">
                        <b>LUWE</b>
                    </a>
                    <p>Temukan restoran favorit di sekitar kamu dengan mudah dan cepat</p>
                </div>
                <div class="sosmed">

                    <b>Ikuti kami</b>
                    <div class="sosmed-list">
                        <a href="#" aria-label="Facebook Luwe">
                            <span is="i-icon">${facebookFSVG}</span>
                        </a>
                        <a href="#" aria-label="Instagram Luwe">
                            <span is="i-icon">${instagramSVG}</span>
                        </a>
                        <a href="#" aria-label="twitter Luwe">
                            <span is="i-icon">${twitterSVG}</span>
                        </a>
                    </div>
                </div>
                <p class="copyright">Copyright &copy; 2021 - Luwe</p>
            </div>
        `
    }
}

customElements.define('my-footer', Footer, { extends: 'footer' })
