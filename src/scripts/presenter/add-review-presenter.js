const AddReviewPresenter = {
    init ({ form, reviewContainer, Username, idRestaurant, ReviewRestaurant, View }) {
        this._username = Username
        this._idRestaurant = idRestaurant
        this._ReviewRestaurant = ReviewRestaurant

        this._initialAddReviewView({ View, form, reviewContainer })
    },

    _initialAddReviewView ({ View, form, reviewContainer }) {
        const usernameInBegin = this._username.getName()

        this._view = new View({
            form,
            reviewContainer,
            usernameInBegin,
            savenameHandler: (newName) => this._saveName(newName),
            submitHandler: (name, review) => this._send(name, review)
        })
    },

    _saveName (newName) {
        return this._username.setName(newName)
    },

    async _send (review) {
        return await this._ReviewRestaurant.add(review, this._idRestaurant)
    }
}

export default AddReviewPresenter
