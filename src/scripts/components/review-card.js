import Loading from '../utils/loading'

class reviewCard extends HTMLElement {
    connectedCallback () {
        this.render()
    }

    render () {
        this.innerHTML = /* html */ `
            <p class='name'>Lorem ipsum</p>
            <p class='date'>00 November 000</p>
            <p class='content'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit ligula eget dolor.</p>
        `
        this._loading = new Loading({
            element: this
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
        this.querySelector('.name').innerHTML = this._data.name
        this.querySelector('.date').innerHTML = this._data.date
        this.querySelector('.content').innerHTML = this._data.review

        this._loading.clear()
    }
}
customElements.define('review-card', reviewCard)
