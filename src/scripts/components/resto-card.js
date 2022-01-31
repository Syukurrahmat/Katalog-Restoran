import API_ENDPOINT from '../global/api-endpoint'
import Loading from '../utils/loading'
import starSVG from '@fortawesome/fontawesome-free/svgs/solid/star.svg'

class RestoCard extends HTMLElement {
    connectedCallback () {
        this.render()
    }

    render () {
        this.innerHTML = /* html */ `
        <img loading='lazy' class="resto-img">
        <div class="resto-content">
            <div class="top">
                <p class="city">Lorem ipsum</p>
                <div class="rate">
                    <span is='i-icon'>${starSVG}</span>
                    <p>00.00</p>
                </div>
            </div>
            <h3 class="name ">Lorem ipsum dolor sit amet</h3>
            <p class="description ">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor</p>
            <a class="button seeDetail">Baca Selengkapnya</a>
        </div>
        `
        this._loading = new Loading({
            element: this,
            otherSelector: '.rate'
        })
    }

    set data (data) {
        this._data = data
        this.applyData()
    }

    get data () {
        return this._data
    }

    applyData () {
        this.querySelector('.resto-img').src = API_ENDPOINT.IMAGE('small', this._data.pictureId)
        this.querySelector('.resto-img').alt = this._data.name
        this.querySelector('.city').innerHTML = this._data.city
        this.querySelector('.rate p').innerHTML = this._data.rating.toFixed(1)
        this.querySelector('.name').innerHTML = this._data.name
        this.querySelector('.description').innerHTML = this._data.description
        this.querySelector('.seeDetail').href = `#/detail/${this._data.id}`

        this._loading.clear()
    }
}
customElements.define('resto-card', RestoCard)
