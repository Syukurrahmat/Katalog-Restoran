import '../../components/review-card'
import '../../components/menu-list'

import API_ENDPOINT from '../../global/api-endpoint'
import restoSource from '../../data/resto-source'

import UrlParser from '../../routes/url-parser'
import Loading from '../../utils/loading'
import fitSkeletonElement from '../../utils/fit-skeleton-element'

import ReadMoreButtonInitiator from '../../utils/readmore-button-initiator'

import FavoriteButtonPresenter from '../../presenter/favorite-button-presenter'
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb'
import FavoriteButtonView from '../favorite-button-view'

import AddReviewPresenter from '../../presenter/add-review-presenter'
import ReviewRestaurant from '../../data/review-restaurant'
import AddReviewView from '../add-review-view'
import Username from '../../data/username'

import buildingSVG from '@fortawesome/fontawesome-free/svgs/solid/building.svg'
import mapMarkerAltSVG from '@fortawesome/fontawesome-free/svgs/solid/map-marker-alt.svg'
import starSVG from '@fortawesome/fontawesome-free/svgs/solid/star.svg'
import userSVG from '@fortawesome/fontawesome-free/svgs/solid/user.svg'
import paperPlaneSVG from '@fortawesome/fontawesome-free/svgs/solid/paper-plane.svg'

const Detail = {
    async render () {
        return /* html */ `
            <div class='detail-resto-top'>
                <img class='detail-resto-top-img'>
                <div class='detail-resto-top-content'>
                    <div class='flex justify-between'>
                        <h2 class='name'>Lorem ipsum dolor sit amet</h2>
                        <button class='favoriteButton'></button>
                    </div>
                    <p class='category'>Lorem • Lorem</p>
                    <ul>
                        <li>
                            <span is='i-icon'>${buildingSVG}</span>
                            <p class='city'>Lorem</p>
                        </li>
                        <li>
                            <span is='i-icon'>${mapMarkerAltSVG}</span>
                            <p class='address'>Lorem ipsum dolor sit amet</p>
                        </li>
                        <li>
                            <span is='i-icon'>${starSVG}</span>
                            <p class='rating'>0.0</p>
                        </li>
                    </ul>
                    <h3>Deskripsi</h3>
                    <p class='description'>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient Lorem ipsum dolor sit amet, 
                    </p>
                    <button class='button readmore'></button>
                </div>
            </div>
            <div class='detail-resto-bottom container'>
                <h3>Daftar menu</h3>
                <div class='menulist-group'>
                   <menu-list group='foods'></menu-list>
                   <menu-list group='drinks'></menu-list>
                </div>
                <h3>Review Restoran</h3>
                <form class='addReview'>
                    <div class='flex username-group'>
                        <span is='i-icon'>${userSVG}</span>
                        <input label='nama' class='name' name='name' tab-index=-1 type='text' placeholder='Tetapkan nama Anda'>
                        <button aria-label='edit username' class='edit-name'>(edit)</button>
                    </div>
                    <div class='flex test-review-field'>
                        <input label='teks review' class='review-text' type='text' name='review-text' placeholder='Tambahkan Review Restoran'>
                        <button aria-label='submit review' type='submit' class='button send'>
                            <span is='i-icon'>${paperPlaneSVG}</span>
                        </button>
                    </div>
                </form>
                <div class='review'>
                    <review-card></review-card>
                    <review-card></review-card>
                </div>
            </div>
      `
    },

    async afterRender (content) {
        const readMoreButton = content.querySelector('button.readmore')
        const description = content.querySelector('.description')

        const loading = new Loading({
            element: content,
            otherSelector: '.detail-resto-top-content ul li, .addReview .username-group'
        })

        ReadMoreButtonInitiator.init(readMoreButton, description)
        await this._fetchData(content)

        loading.clear()
    },

    async _fetchData (content) {
        const favoriteButton = content.querySelector('.favoriteButton')
        const menulistGroup = content.querySelector('.menulist-group')
        const reviewContainer = content.querySelector('.review')
        const addReviewForm = content.querySelector('form.addReview')

        const idRestaurant = UrlParser.parseActiveUrlWithoutCombiner().id
        const restaurantData = (await restoSource.detailResto(idRestaurant)).restaurant

        await FavoriteButtonPresenter.init({
            favoriteRestaurants: FavoriteRestaurantIdb,
            View: FavoriteButtonView,
            favoriteButton,
            restaurantData
        })

        AddReviewPresenter.init({
            form: addReviewForm,
            View: AddReviewView,
            reviewContainer,
            Username,
            idRestaurant,
            ReviewRestaurant
        })

        this._applyInfoRestaurantData(content, restaurantData)
        this._applyMenusRestaurantData(menulistGroup, restaurantData.menus)
        this._applyReviewData(reviewContainer, restaurantData.customerReviews)
    },

    _applyInfoRestaurantData (content, restaurantData) {
        content.querySelector('.detail-resto-top-img').src = API_ENDPOINT.IMAGE('medium', restaurantData.pictureId)
        content.querySelector('.detail-resto-top-img').alt = restaurantData.name
        content.querySelector('.name').innerText = restaurantData.name
        content.querySelector('.category').innerText = restaurantData.categories.map(category => category.name).join(' • ')
        content.querySelector('.city').innerText = restaurantData.city
        content.querySelector('.address').innerText = restaurantData.address
        content.querySelector('.rating').innerText = restaurantData.rating.toFixed(1)
        content.querySelector('.description').innerText = restaurantData.description
    },

    _applyMenusRestaurantData (menuListContainer, menuLists) {
        for (const menuListElement of menuListContainer.children) {
            menuListElement.data = menuLists[menuListElement.group]
        }
    },

    _applyReviewData (reviewContainer, customerReviews) {
        const reviewCardSkeletons = reviewContainer.children

        const reviewCards = fitSkeletonElement(reviewCardSkeletons, customerReviews.length)
        reviewCards.forEach((reviewCard, index) => {
            reviewCard.data = customerReviews[customerReviews.length - 1 - index]
        })
    }
}

export default Detail
