const assert = require('assert')

Feature('Remove restaruant from favorit list')

const addRestaurantToFavoritList = ({ I }, count) => {
    for (let i = 1; i <= count; i++) {
        I.amOnPage('#')
        I.waitForInvisible('.is-loading:not([loading=lazy])')

        I.click(locate('resto-card a.seeDetail').at(i))
        I.waitForInvisible('.is-loading')
        I.click('.favoriteButton')
    }
}

Before(({ I }) => {
    addRestaurantToFavoritList({ I }, 2 + Math.round(Math.random() * 2))
})

Scenario('not showing empty alert', ({ I }) => {
    I.amOnPage('#/favorite')
    I.waitForInvisible('.is-loading')

    I.dontSeeElement('.favorit-is-empty-note-element')
    I.dontSee('Belum ada daftar restoran favorit')
})

Scenario('remove one restaurant', async ({ I }) => {
    I.amOnPage('#/favorite')
    I.waitForInvisible('.is-loading')
    I.seeElement('resto-card')
    I.click('a.seeDetail', locate('resto-card').first())
    I.waitForInvisible('.is-loading')
    I.seeElement('h2.name')
    const restoName = await I.grabTextFrom('h2.name')

    I.seeElement('.favoriteButton')
    I.click('.favoriteButton')

    I.seeElement('.my-alert[data-status="success"]')
    I.see('Restoran berhasil dihapus dari daftar favorit', '.my-alert')
    I.amOnPage('#/favorite')

    I.dontSee(restoName, 'resto-card .name')
})

Scenario('clear the restaurant list', async ({ I }) => {
    I.amOnPage('#/favorite')

    I.waitForInvisible('.is-loading')
    I.seeElement('resto-card')

    const favoritesRestaurantCount = await I.grabNumberOfVisibleElements('resto-card')

    for (let i = 1; i <= favoritesRestaurantCount; i++) {
        I.click('a.seeDetail', locate('resto-card').first())

        I.seeElement('.favoriteButton')
        I.click('.favoriteButton')

        I.seeElement('.my-alert[data-status="success"]')
        I.see('Restoran berhasil dihapus dari daftar favorit', '.my-alert')

        I.amOnPage('#/favorite')
    }

    I.waitForInvisible('.is-loading')
    I.dontSee('resto-card')
    I.seeElement('.favorit-is-empty-note-element')
    I.see('Belum ada daftar restoran favorit', '.favorit-is-empty-note-element')
})
