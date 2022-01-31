
class Loading {
    constructor ({ element, otherSelector, onlyOtherSelector }) {
        this._element = element
        this._otherSelector = otherSelector || ''
        this._onlyOtherSelector = onlyOtherSelector || false

        this._generateSelector()
        this.set()
    }

    _generateSelector () {
        const baseSelector = 'a, button, b, p, h1, h2, h3, h4, h5, h6, h7, h8, img, input[type=text]'
        this.elementsSelector = this._onlyOtherSelector ? this._otherSelector : `${baseSelector} ${this._otherSelector ? ',' + this._otherSelector : ''}`
    }

    set () {
        this._element.querySelectorAll(this.elementsSelector).forEach(loadingElement => loadingElement.classList.add('is-loading'))
    }

    clear () {
        this._element.querySelectorAll('.is-loading').forEach(loadingElement => {
            if (loadingElement.tagName === 'IMG') {
                loadingElement.onload = () => loadingElement.classList.remove('is-loading')
                return
            }
            loadingElement.classList.remove('is-loading')
        })
    }
}

export default Loading
