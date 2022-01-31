import '../src/scripts/components/review-card'
import Username from '../src/scripts/data/username'
import { AddReviewPresenterInitiation, createHTMLAddReview, setUsername } from './helpers/testFactories'

describe('Saving Username In Add Review Form', () => {
    beforeEach(() => {
        createHTMLAddReview()
    })

    afterEach(() => {
        window.localStorage.clear()
    })

    it('should save username when username input element has lost focus', () => {
        AddReviewPresenterInitiation()
        setUsername()

        expect(Username.getName()).toEqual('Syukur Rahmatullah')
    })

    it('should ask the model to save new username', () => {
        spyOn(Username, 'setName')
        Username.setName.withArgs('Syukur Rahmatullah').and.returnValues('Syukur Rahmatullah')
        AddReviewPresenterInitiation()
        setUsername()

        expect(Username.setName).toHaveBeenCalled()
    })

    it('should username input displaying empty if there is no username saved in local storage', () => {
        AddReviewPresenterInitiation()
        const nameInput = document.querySelector('.name')

        expect(nameInput.value).toEqual('')
    })

    it('should username is saved in localstorage', () => {
        AddReviewPresenterInitiation()
        setUsername()

        expect(window.localStorage.getItem('username')).toEqual('Syukur Rahmatullah')
    })

    it('should dont save username saved if username input element is empty', () => {
        AddReviewPresenterInitiation()
        const oldUsername = 'Syukur Rahmatullah'

        // Save username lama
        setUsername(oldUsername)

        // Ubah Username dengan empty
        setUsername('')
        expect(Username.getName()).toEqual(oldUsername)

        setUsername('    ')
        expect(Username.getName()).toEqual(oldUsername)
    })

    it('should username input displaying current username if there is a username saved in local storage', () => {
        Username.setName('Syukur Rahmatullah')
        AddReviewPresenterInitiation()

        expect(document.querySelector('.name').value).toEqual('Syukur Rahmatullah')
    })
})
