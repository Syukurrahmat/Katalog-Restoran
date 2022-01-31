import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb'
import expectMyAlert from './helpers/ecpectMyAlert'
import { createFavoriteButtonPresenterWithRestaurant, createHTMLFavoriteButton } from './helpers/testFactories'

describe('Add to Favorite A Restaurant', () => {
    beforeEach(() => {
        createHTMLFavoriteButton()
    })

    it('should show the "add to favorite" button when the restaurant has not been added before', async () => {
        await createFavoriteButtonPresenterWithRestaurant({ id: 1 })

        expect(document.querySelector('[aria-label="Tambahkan restoran ke daftar favorit"]')).toBeTruthy()
    })

    it('should not show the "remove from favorite" button when the restaurant has not been added before', async () => {
        await createFavoriteButtonPresenterWithRestaurant({ id: 1 })

        expect(document.querySelector('[aria-label="Hapus restoran dari daftar favorit"]')).toBeFalsy()
    })

    it('should be able to add to favorite the restaurant', async () => {
        await createFavoriteButtonPresenterWithRestaurant({ id: 1 })

        document.querySelector('.favoriteButton').dispatchEvent(new Event('click'))
        const restaurant = await FavoriteRestaurantIdb.getRestaurant(1)
        expect(restaurant).toEqual({ id: 1 })

        FavoriteRestaurantIdb.deleteRestaurant(1)
    })

    it('should not add a restaurant again when its already added in favorite restaurant list', async () => {
        await createFavoriteButtonPresenterWithRestaurant({ id: 1 })
        await FavoriteRestaurantIdb.putRestaurant({ id: 1 })

        document.querySelector('.favoriteButton').dispatchEvent(new Event('click'))

        expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([{ id: 1 }])

        FavoriteRestaurantIdb.deleteRestaurant(1)
    })

    it('should not add a restaurant when it has no id', async () => {
        await createFavoriteButtonPresenterWithRestaurant({})

        document.querySelector('.favoriteButton').dispatchEvent(new Event('click'))

        expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([])
    })

    it('should show success alert after add restaurant to favorite list', async () => {
        await createFavoriteButtonPresenterWithRestaurant({ id: 1 })
        document.querySelector('.favoriteButton').dispatchEvent(new Event('click'))

        expectMyAlert('Restoran berhasil ditambahkahkan ke daftar favorit', 'success')
        FavoriteRestaurantIdb.deleteRestaurant(1)
    })
})
