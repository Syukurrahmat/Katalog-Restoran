import MyAlert from '../utils/my-alert'
import farBookmarkSVG from '@fortawesome/fontawesome-free/svgs/regular/bookmark.svg'
import fasBookmarkSVG from '@fortawesome/fontawesome-free/svgs/solid/bookmark.svg'

class FavoriteButtonView {
    constructor ({ button, isFavoriteInBegin, clickHandler }) {
        this._button = button

        this._renderButton(isFavoriteInBegin)
        this._buttonAddEventListener(clickHandler)
    }

    _renderButton (isFavoriteInBegin) {
        isFavoriteInBegin ? this.renderRemoveFromFavoriteButton() : this.renderAddtoFavoriteButton()
    }

    _buttonAddEventListener (clickHandler) {
        this._button.addEventListener('click', clickHandler)
    }

    pushSuccessAddFavoritAlert () {
        new MyAlert('Restoran berhasil ditambahkahkan ke daftar favorit')
    }

    pushSuccessRemoveFavoritAlert () {
        new MyAlert('Restoran berhasil dihapus dari daftar favorit')
    }

    renderAddtoFavoriteButton () {
        this._button.innerHTML = /* html */`<span is='i-icon'>${farBookmarkSVG}</span>`
        this._button.dataset.favorite = '0'
        this._button.setAttribute('aria-label', 'Tambahkan restoran ke daftar favorit')
    }

    renderRemoveFromFavoriteButton () {
        this._button.innerHTML = /* html */`<span is='i-icon'>${fasBookmarkSVG}</span>`
        this._button.dataset.favorite = '1'
        this._button.setAttribute('aria-label', 'Hapus restoran dari daftar favorit')
    }
}

export default FavoriteButtonView
