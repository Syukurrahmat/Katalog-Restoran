import CONFIG from './config'

const API_ENDPOINT = {
    LIST: `${CONFIG.BASE_URL}list`,
    DETAIL: (id) => `${CONFIG.BASE_URL}detail/${id}`,
    IMAGE: (size, id) => `${CONFIG.BASE_IMAGE_URL}${size}/${id}`,
    ADD_REVIEW: `${CONFIG.BASE_URL}review`
}

export default API_ENDPOINT
