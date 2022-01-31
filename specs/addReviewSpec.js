import '../src/scripts/components/review-card'
import ReviewRestaurant from '../src/scripts/data/review-restaurant'
import expectMyAlert from './helpers/ecpectMyAlert'
import { AddReviewPresenterInitiation, createHTMLAddReview, setReviewText, setUsername, submitAddReviewForm } from './helpers/testFactories'

describe('Adding New Review', () => {
    beforeEach(() => {
        createHTMLAddReview()
        AddReviewPresenterInitiation()
    })

    afterEach(() => {
        window.localStorage.clear()
    })

    it('should ask the model to add new review', (done) => {
        spyOnAllFunctions(ReviewRestaurant)

        ReviewRestaurant.add.withArgs('Restorannya keren', 1).and.returnValues({
            name: 'Syukur Rahmatullah',
            review: 'Restorannya keren',
            date: '1 Desember 2021'
        })

        setUsername()
        setReviewText()
        submitAddReviewForm()

        // Submit Handler berjalan secara hronous
        setTimeout(() => {
            expect(ReviewRestaurant.add).toHaveBeenCalled()
            done()
        })
    })

    it('should generate new review element in review container when success for submitting new user review', (done) => {
        spyOnAllFunctions(ReviewRestaurant)

        ReviewRestaurant.add.withArgs('Restorannya keren', 1).and.returnValues({
            name: 'Syukur Rahmatullah',
            review: 'Restorannya keren',
            date: '1 Desember 2021'
        })

        setUsername()
        setReviewText()
        submitAddReviewForm()

        // Submit Handler berjalan secara asynchronous
        setTimeout(() => {
            const reviewContainer = document.querySelector('.review')
            const newReviewCard = reviewContainer.querySelector('review-card')

            expect(reviewContainer.childElementCount).toEqual(1)
            expect(newReviewCard).toBeTruthy()
            expect(newReviewCard.data).toEqual({
                name: 'Syukur Rahmatullah',
                review: 'Restorannya keren',
                date: '1 Desember 2021'
            })
            done()
        })
    })

    it('should show success alert after success submitting new review', (done) => {
        spyOnAllFunctions(ReviewRestaurant)

        ReviewRestaurant.add.withArgs('Restorannya keren', 1).and.returnValues({
            name: 'Syukur Rahmatullah',
            review: 'Restorannya keren',
            date: '1 Desember 2021'
        })

        setUsername()
        setReviewText()
        submitAddReviewForm()

        // Submit Handler berjalan secara asynchronous
        setTimeout(() => {
            expectMyAlert('Review Anda Berhasil ditambahkan', 'success')
            done()
        })
    })

    it('should show warning alert if submitting new review with username', (done) => {
        setReviewText()
        submitAddReviewForm()

        // Submit Handler berjalan secara asynchronous
        setTimeout(() => {
            expectMyAlert('Tetapkan username Anda terlebih dahulu', 'warning')
            done()
        })
    })

    it('should show warning alert if submitting new review without review text', (done) => {
        setUsername()
        submitAddReviewForm()

        // Submit Handler berjalan secara asynchronous
        setTimeout(() => {
            expectMyAlert('Sepertinya Anda belum menuliskan review', 'warning')
            done()
        })
    })
    it('should show warning alert if submitting new review  with a review text containing a space (like " ")', (done) => {
        setUsername()
        setReviewText('    ')
        submitAddReviewForm()

        // Submit Handler berjalan secara asynchronous
        setTimeout(() => {
            expectMyAlert('Sepertinya Anda belum menuliskan review', 'warning')
            done()
        })
    })

    it('should show offline alert if submitting new review when bad network connection or offline', (done) => {
        spyOnAllFunctions(ReviewRestaurant)

        ReviewRestaurant.add.withArgs('Restorannya keren', 1).and.returnValues({
            error: true,
            message: 'Failed to fetch'
        })

        setUsername()
        setReviewText()
        submitAddReviewForm()

        // Submit Handler berjalan secara asynchronous
        setTimeout(() => {
            const offlineAlertElement = document.querySelector('.offline-alert')

            expect(offlineAlertElement).toBeTruthy()
            expect(offlineAlertElement.querySelector('.message').innerText).toEqual('Review Anda gagal ditambahkan')
            done()
        })
    })

    it('should not generate new review element when failed for add new user review', (done) => {
        spyOnAllFunctions(ReviewRestaurant)

        ReviewRestaurant.add.withArgs('Restorannya keren', 1).and.returnValues({
            error: true
        })

        setUsername()
        setReviewText()
        submitAddReviewForm()

        // Submit Handler berjalan secara asynchronous
        setTimeout(() => {
            const reviewContainer = document.querySelector('.review')
            const newReviewCard = reviewContainer.querySelector('review-card')

            expect(reviewContainer.childElementCount).toEqual(0)
            expect(newReviewCard).toBeFalsy()
            done()
        })
    })
})
