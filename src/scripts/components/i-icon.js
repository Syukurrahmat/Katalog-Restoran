class IIcon extends HTMLSpanElement {
    connectedCallback () {
        this.removeAttribute('is', 'i-icon')
        this.classList.add('i-icon')
        const svg = this.querySelector('svg')

        svg.querySelector('path').setAttribute('fill', 'currentColor')
    }
}

customElements.define('i-icon', IIcon, { extends: 'span' })
