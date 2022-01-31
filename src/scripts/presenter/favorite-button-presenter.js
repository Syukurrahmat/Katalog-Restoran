const FavoriteButtonPresenter = {
    async init ({ favoriteRestaurants, favoriteButton, restaurantData, View }) {
        this._favoriteButton = favoriteButton
        this._restaurantData = restaurantData
        this._favoriteRestaurants = favoriteRestaurants
        await this._initialFavoriteButtonView(View)
    },

    async _initialFavoriteButtonView (View) {
        const isFavoriteRestaurant = await this._isFavoriteRestaurant()

        this._view = new View({
            button: this._favoriteButton,
            isFavoriteInBegin: isFavoriteRestaurant,
            clickHandler: this._clickHandler.bind(this)
        })
    },

    async _isFavoriteRestaurant () {
        const { id } = this._restaurantData
        const restaurant = await this._favoriteRestaurants.getRestaurant(id)
        return !!restaurant
    },

    _clickHandler (event) {
        event.preventDefault()
        this._favoriteButton.dataset.favorite === '0' ? this._addToFavorite() : this._removeFromFavorite()
    },

    _addToFavorite () {
        this._favoriteRestaurants.putRestaurant(this._restaurantData)
        this._view.pushSuccessAddFavoritAlert()
        this._view.renderRemoveFromFavoriteButton()
    },

    _removeFromFavorite () {
        this._view.pushSuccessRemoveFavoritAlert()
        this._favoriteRestaurants.deleteRestaurant(this._restaurantData.id)
        this._view.renderAddtoFavoriteButton()
    }
}

export default FavoriteButtonPresenter
