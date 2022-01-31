const assert = require('assert')

Feature('Add restaruant to favorit list')

Before(({ I }) => {
    I.amOnPage('#/favorite')
})

Scenario('showing empty favorited restaurants', ({ I }) => {
    I.waitForInvisible('.is-loading')
    I.seeElement('.favorit-is-empty-note-element')
    I.see('Belum ada daftar restoran favorit', '.favorit-is-empty-note-element')
})

Scenario('adding one restaurant to favorite list', async ({ I }) => {
    I.see('Belum ada daftar restoran favorit', '.favorit-is-empty-note-element')

    I.amOnPage('#')
    I.waitForInvisible('.is-loading:not([loading=lazy])')

    I.seeElement('resto-card')
    I.click('a.seeDetail', locate('resto-card').first())

    I.waitForInvisible('.is-loading')

    I.seeElement('h2.name')
    const restoName = await I.grabTextFrom('h2.name')

    I.seeElement('.favoriteButton')
    I.click('.favoriteButton')

    I.seeElement('.my-alert[data-status="success"]')
    I.see('Restoran berhasil ditambahkahkan ke daftar favorit', '.my-alert')

    I.amOnPage('#/favorite')
    I.waitForInvisible('.is-loading')

    I.dontSee('Belum ada daftar restoran favorit')
    I.seeElement('resto-card')
    const favoritedRestaurantName = await I.grabTextFrom('resto-card .name')

    assert.strictEqual(favoritedRestaurantName, restoName)
})

Scenario('adding some restaurant to favorite list', async ({ I }) => {
    I.see('Belum ada daftar restoran favorit', '.favorit-is-empty-note-element')

    const nameRestaurants = []
    const restaurantsCountToBeFavorite = 2 + Math.round(Math.random() * 4)

    for (let i = 1; i <= restaurantsCountToBeFavorite; i++) {
        I.amOnPage('#')
        I.waitForInvisible('.is-loading:not([loading=lazy])')

        I.seeElement('resto-card')

        I.click(locate('resto-card a.seeDetail').at(i))

        I.waitForInvisible('.is-loading')

        I.seeElement('.favoriteButton')
        I.click('.favoriteButton')

        I.seeElement('h2.name')
        nameRestaurants.push(await I.grabTextFrom('h2.name'))

        I.seeElement('.my-alert[data-status="success"]')
        I.see('Restoran berhasil ditambahkahkan ke daftar favorit', '.my-alert')
    }

    I.amOnPage('#/favorite')
    I.waitForInvisible('.is-loading')

    I.dontSee('Belum ada daftar restoran favorit')
    I.seeElement('resto-card')

    const visiblefavoritedRestaurant = await I.grabNumberOfVisibleElements('resto-card')
    for (let i = 1; i <= visiblefavoritedRestaurant; i++) {
        const oneOfRestoName = await I.grabTextFrom(locate('resto-card .name').at(i))
        assert.ok(nameRestaurants.includes(oneOfRestoName))
    }
})
