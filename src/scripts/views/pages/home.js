import restoSource from '../../data/resto-source'
import fitSkeletonElement from '../../utils/fit-skeleton-element'

const Home = {
    async render () {
        return /* html */`
        <div class='hero'>
        <picture class='hero-img'>
            <source media="(max-width: 480px)" srcset="../assets/images/heros/hero-image_2-small.webp" type="image/webp">
            <source media="(max-width: 480px)" srcset="../assets/images/heros/hero-image_2-small.jpg" type="image/jpeg">
            <source srcset="../assets/images/heros/hero-image_2.webp" type="image/webp">
            <img src='../assets/images/heros/hero-image_2.jpg' alt='Foto makanan di atas meja'>
        </picture>
            <div class='hero-content container'>
                <h1>LUWE</h1>
                <p>Temukan restoran favorit di sekitar kamu dengan mudah dan cepat</p>
            </div>
        </div>
        <div class='restolist container'>
            <div class='title'>
                <h2>Eksplor Restoran</h2>
                <p>Temukan Restoran Di Sekitarmu</p>
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
        const data = await restoSource.listResto()
        const restoCardSkeletons = content.querySelector('.restolist-content').children

        const restoCards = fitSkeletonElement(restoCardSkeletons, data.length)
        restoCards.forEach((restoCard, index) => {
            restoCard.data = data[index]
        })
    }
}

export default Home
