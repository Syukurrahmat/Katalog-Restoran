import restoSource from '../../data/resto-source'
import fitSkeletonElement from '../../utils/fit-skeleton-element'

const Favorite = {
    async render () {
        return /* html */ `
        <div class='restolist container'>
            <div class='title'>
                <h2>Restoran Favorit</h2>
                <p>Kunjungi Kembali Restoran Favoritmu</p>
            </div>
            <div class='restolist-content'>
                <resto-card></resto-card>
                <resto-card></resto-card>
                <resto-card></resto-card>
                <resto-card></resto-card>
            </div>
        </div>
        `
    },

    async afterRender (content) {
        const data = await restoSource.favoriteList()
        const restoCardSkeletons = content.querySelector('.restolist-content').children

        const restoCards = fitSkeletonElement(restoCardSkeletons, data.length)
        if (!restoCards.length) return this._favoritIsEmpty(content)

        restoCards.forEach((restoCard, index) => {
            restoCard.data = data[index]
        })
    },

    _favoritIsEmpty (content) {
        const restolistContent = content.querySelector('.restolist-content')
        restolistContent.innerHTML = /* html */ `
            <div class="favorit-is-empty-note-element">
                <h2>Belum ada daftar restoran favorit </h2>
                <p>Eksplor restoran, dan temukan restoran favoritmu </p>
            </div>        
        `
    }
}

export default Favorite
