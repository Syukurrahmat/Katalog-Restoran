import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb'
import expectMyAlert from './helpers/ecpectMyAlert'
import { createFavoriteButtonPresenterWithRestaurant, createHTMLFavoriteButton } from './helpers/testFactories'

describe('Remove From Favorite A Restaurant A Movie', () => {
    beforeEach(async () => {
        createHTMLFavoriteButton()
        await FavoriteRestaurantIdb.putRestaurant({ id: 1 })
    })

    afterEach(async () => {
        await FavoriteRestaurantIdb.deleteRestaurant(1)
    })

    it('should display "remove from favorite" button when the restaurant has been added', async () => {
        await createFavoriteButtonPresenterWithRestaurant({ id: 1 })

        expect(document.querySelector('[aria-label="Hapus restoran dari daftar favorit"]')).toBeTruthy()
    })

    it('should not display "remove from favorite" when the restaurant has been added', async () => {
        await createFavoriteButtonPresenterWithRestaurant({ id: 1 })

        expect(document.querySelector('[aria-label="Tambahkan restoran ke daftar favorit"]')).toBeFalsy()
    })

    it('should be able to remove from favorite restaurant from the list', async () => {
        await createFavoriteButtonPresenterWithRestaurant({ id: 1 })
        document.querySelector('[aria-label="Hapus restoran dari daftar favorit"]').dispatchEvent(new Event('click'))

        expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([])
    })

    it('should not throw error if the unfavorite restaurant is not in the list', async () => {
        await createFavoriteButtonPresenterWithRestaurant({ id: 1 })
        await FavoriteRestaurantIdb.deleteRestaurant(1)
        document.querySelector('[aria-label="Hapus restoran dari daftar favorit"]').dispatchEvent(new Event('click'))

        expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([])
    })

    it('should show success alert after remove restaurant from favorite list', async () => {
        await createFavoriteButtonPresenterWithRestaurant({ id: 1 })
        document.querySelector('.favoriteButton').dispatchEvent(new Event('click'))

        expectMyAlert('Restoran berhasil dihapus dari daftar favorit', 'success')
    })
})
