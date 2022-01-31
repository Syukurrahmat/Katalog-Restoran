import FavoriteRestaurantIdb from '../../src/scripts/data/favorite-restaurant-idb'
import ReviewRestaurant from '../../src/scripts/data/review-restaurant'
import Username from '../../src/scripts/data/username'
import AddReviewPresenter from '../../src/scripts/presenter/add-review-presenter'
import FavoriteButtonPresenter from '../../src/scripts/presenter/favorite-button-presenter'
import AddReviewView from '../../src/scripts/views/add-review-view'
import FavoriteButtonView from '../../src/scripts/views/favorite-button-view'

const createFavoriteButtonPresenterWithRestaurant = async (restaurantData) => {
    await FavoriteButtonPresenter.init({
        favoriteRestaurants: FavoriteRestaurantIdb,
        View: FavoriteButtonView,
        favoriteButton: document.querySelector('.favoriteButton'),
        restaurantData
    })
}
const createHTMLFavoriteButton = () => {
    document.body.innerHTML = /* html */'<button class="favoriteButton"></button>'
}
const createHTMLAddReview = () => {
    document.body.innerHTML = /* html */ `
        <form class='addReview'>
            <div class='flex'>
                <input label='nama' class='name' required name='name' type='text' placeholder='Tetapkan nama Anda'>
                <button aria-label='edit username' class='edit-name'>(edit)</button>
            </div>
            <div class='flex'>
                <input label='teks review' class='review-text' required type='text' name='review-text' placeholder='Tambahkan Review Restoran'>
                <button aria-label='submit review' type='submit' class='button send'></button>
            </div>
        </form>
        <div class='review'></div>
    `
}

const AddReviewPresenterInitiation = () => {
    AddReviewPresenter.init({
        form: document.querySelector('form'),
        reviewContainer: document.querySelector('.review'),
        idRestaurant: 1,
        ReviewRestaurant: ReviewRestaurant,
        View: AddReviewView,
        Username
    })
}

const setUsername = (name = 'Syukur Rahmatullah') => {
    const nameInput = document.querySelector('.name')
    nameInput.value = name
    nameInput.dispatchEvent(new Event('blur'))
}

const setReviewText = (review = 'Restorannya keren') => {
    document.querySelector('.review-text').value = review
}

const submitAddReviewForm = () => {
    document.querySelector('form').dispatchEvent(new Event('submit'))
}

export {
    createFavoriteButtonPresenterWithRestaurant,
    createHTMLFavoriteButton,
    createHTMLAddReview,
    AddReviewPresenterInitiation,
    setUsername,
    setReviewText,
    submitAddReviewForm
}
