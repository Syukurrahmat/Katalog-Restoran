const ReadMoreButtonInitiator = {
    init (button, description) {
        this._button = button
        this._description = description

        this._render()
        this._addEventListener()
    },

    _render () {
        this._button.innerText = 'Baca Selengkapnya'
    },

    _addEventListener () {
        this._button.addEventListener('click', () => {
            this._description.classList.toggle('more') ? this._lessDescription() : this._moreDescription()
        })
    },

    _moreDescription () {
        this._button.innerText = 'Baca Selengkapnya'
        this._description.style.height = null
    },
    _lessDescription () {
        this._button.innerText = 'Baca Sekurangnya'
        this._description.style.height = this._description.scrollHeight + 'px'
    }
}

export default ReadMoreButtonInitiator
