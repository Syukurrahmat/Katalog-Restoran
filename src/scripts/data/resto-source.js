import API_ENDPOINT from '../global/api-endpoint'
import OfflineAlert from '../utils/offline-alert'
import FavoriteRestaurantIdb from './favorite-restaurant-idb'

class restoSource {
    static async listResto () {
        return await fetch(API_ENDPOINT.LIST)
            .then(response => response.json())
            .then(responseJson => responseJson.restaurants)
            .catch((error) => {
                if (error.message === 'Failed to fetch') new OfflineAlert('Gagal menampilkan daftar restaurant')
                throw error
            })
    }

    static async detailResto (id) {
        return await fetch(API_ENDPOINT.DETAIL(id))
            .then(response => response.json())
            .then(responseJson => responseJson)
            .catch((error) => {
                if (error.message === 'Failed to fetch') new OfflineAlert('Gagal menampilkan detail restaurant')
                throw error
            })
    }

    static async favoriteList () {
        return FavoriteRestaurantIdb.getAllRestaurants()
    }
}

export default restoSource
