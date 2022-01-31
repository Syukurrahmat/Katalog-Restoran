import API_ENDPOINT from '../global/api-endpoint'
import Username from './username'

const ReviewRestaurant = {
    async add (review, idRestaurant) {
        const name = Username.getName()
        review = review.trim()
        if (!name) return { error: true, message: 'Username is empty' }
        if (!review) return { error: true, message: 'Review is empty' }
        if (!idRestaurant) throw new Error('Restaurant id does not exist')

        return await fetch(API_ENDPOINT.ADD_REVIEW, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, review, id: idRestaurant })
        })
            .then(response => response.json())
            .then(response => response.customerReviews.reverse()[0])
            .catch((error) => {
                if (error.message === 'Failed to fetch') return { error: true, message: error.message }

                throw error
            })
    }
}

export default ReviewRestaurant
