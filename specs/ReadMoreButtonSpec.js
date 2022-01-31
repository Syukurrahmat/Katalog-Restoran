import ReadMoreButtonInitiator from '../src/scripts/utils/readmore-button-initiator'

describe('ReadMore Description A Restaurant', () => {
    beforeEach(() => {
        document.body.innerHTML = /* html */ `
            <p class="description">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient
            </p>
            <button class="button readmore"></button>
        `
    })

    it('should more description when readmore button is clicked', () => {
        const readMoreButton = document.querySelector('button.readmore')
        const description = document.querySelector('.description')

        ReadMoreButtonInitiator.init(readMoreButton, description)
        readMoreButton.dispatchEvent(new Event('click'))

        expect(description.classList.contains('more')).toBeTruthy()
    })

    it('should show less description when the button is clicked when the description is showing all', () => {
        const readMoreButton = document.querySelector('button.readmore')
        const description = document.querySelector('.description')

        ReadMoreButtonInitiator.init(readMoreButton, description)
        readMoreButton.dispatchEvent(new Event('click'))
        readMoreButton.dispatchEvent(new Event('click'))

        expect(description.classList.contains('more')).toBeFalsy()
    })
})
