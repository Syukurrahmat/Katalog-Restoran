import OfflineAlert from '../utils/offline-alert'
import MyAlert from '../utils/my-alert'

import paperPlaneSVG from '@fortawesome/fontawesome-free/svgs/solid/paper-plane.svg'
import circleNotchSVG from '@fortawesome/fontawesome-free/svgs/solid/circle-notch.svg'

class AddReviewView {
    constructor ({ form, reviewContainer, usernameInBegin, savenameHandler, submitHandler }) {
        this._form = form
        this._reviewContainer = reviewContainer

        this._nameInput = this._form.querySelector('.name')
        this._editNameInput = this._form.querySelector('.edit-name')
        this._reviewTextInput = this._form.querySelector('[name=review-text]')
        this._sendButton = this._form.querySelector('.send')

        this._renderUsername(usernameInBegin)
        this._addEventListener({ savenameHandler, submitHandler })
    }

    _renderUsername (usernameInBegin) {
        if (usernameInBegin) {
            this._nameInput.value = usernameInBegin
            this._nameInput.style.width = usernameInBegin.length + 4 + 'ex'
            this._nameInput.disabled = true
        }
    }

    _addEventListener ({ savenameHandler, submitHandler }) {
        this._editNameInput.addEventListener('click', event => this.editName(event))
        this._nameInput.addEventListener('blur', event => this.saveName(event, savenameHandler))
        this._form.addEventListener('submit', event => this.send(event, submitHandler))
        this._reviewTextInput.addEventListener('keydown', event => {
            if (event.keyCode === 13) this._nameInput.value.length ? this.send(event, submitHandler) : this._nameInput.focus()
        })
    }

    editName (event) {
        event.preventDefault()
        this._nameInput.style.width = null
        this._nameInput.disabled = false
        this._nameInput.focus()
    }

    saveName (event, savenameHandler) {
        event.preventDefault()

        const newName = savenameHandler(this._nameInput.value)
        if (!newName) return

        this._nameInput.value = newName
        this._nameInput.style.width = newName.length + 4 + 'ex'
        this._nameInput.disabled = true
    }

    async send (event, submitHandler) {
        event.preventDefault()

        this._sendButton.innerHTML = /* html */`<span is='i-icon' spin>${circleNotchSVG}</span>`

        const myReview = await submitHandler(this._reviewTextInput.value)
        if (myReview.error) {
            switch (myReview.message) {
            case 'Failed to fetch':
                new OfflineAlert('Review Anda gagal ditambahkan', 'close')
                break
            case 'Username is empty':
                new MyAlert('Tetapkan username Anda terlebih dahulu', 'warning')
                break
            case 'Review is empty':
                new MyAlert('Sepertinya Anda belum menuliskan review', 'warning')
                break
            }

            this._sendButton.innerHTML = /* html */ `<span is='i-icon'>${paperPlaneSVG}</span>`
            return
        }

        this._createNewReviewElement(myReview)

        this._sendButton.innerHTML = /* html */ `<span is='i-icon'>${paperPlaneSVG}</span>`
        this._reviewTextInput.value = ''
        new MyAlert('Review Anda Berhasil ditambahkan')
    }

    _createNewReviewElement (review) {
        const newReviewElement = document.createElement('review-card')

        if (this._reviewContainer.childElementCount) {
            this._reviewContainer.insertBefore(newReviewElement, this._reviewContainer.firstElementChild)
        } else {
            this._reviewContainer.appendChild(newReviewElement)
        }
        newReviewElement.data = review
    }
}

export default AddReviewView
