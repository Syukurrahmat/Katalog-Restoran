const assert = require('assert')

Feature('Add review form')

const UsernameHasBeenPreviouslySaved = ({ I }) => {
    I.fillField('input[name=name]', 'Rahmatullah')
    I.pressKey('Tab')
}

Before(({ I }) => {
    I.amOnPage('#')
    I.waitForInvisible('.is-loading:not([loading=lazy])')

    I.seeElement('resto-card')
    I.click('a.seeDetail', locate('resto-card').first())

    I.seeElement('input[name=name]')
    I.seeElement('input[name=review-text]')
    I.seeElement('button.send')
})

Scenario('save username for first time  and saved successfully', async ({ I }) => {
    const username = 'Rahmatullah'
    I.dontSeeElement('button.edit-name')
    assert.ok(await I.grabValueFrom('input[name=name]') === '')
    I.fillField('input[name=name]', username)
    I.pressKey('Tab')

    I.refreshPage()
    I.waitForInvisible('.is-loading')

    assert.strictEqual(await I.grabValueFrom('input[name=name]'), username)
    I.seeElement('button.edit-name')
})

Scenario('edit username and saved successfully', async ({ I }) => {
    UsernameHasBeenPreviouslySaved({ I })
    const newUsername = 'Rahmat'

    I.seeElement('button.edit-name')
    I.click('button.edit-name')

    I.fillField('input[name=name]', newUsername)
    I.pressKey('Tab')

    I.refreshPage()
    I.waitForInvisible('.is-loading')

    assert.strictEqual(await I.grabValueFrom('input[name=name]'), newUsername)
})

Scenario('submitting new review', ({ I }) => {
    UsernameHasBeenPreviouslySaved({ I })

    I.fillField('input[name=review-text]', 'Resorannya mantap banget, sayang gak ada es teh anget')
    I.click('button.send')

    I.waitForElement('.my-alert')
    I.seeElement('.my-alert[data-status="success"]')
    I.see('Review Anda Berhasil ditambahkan', '.my-alert')

    I.seeElement('.review')
    const newReview = locate('.review review-card').first()

    I.see('Rahmatullah', newReview)
    I.see('Resorannya mantap banget, sayang gak ada es teh anget', newReview)
})

Scenario('show warning alert when submitting new review without username', ({ I }) => {
    I.fillField('input[name=review-text]', 'Restorannya mantap banget, sayang gak ada es teh anget')
    I.click('button.send')

    I.waitForElement('.my-alert')
    I.seeElement('.my-alert[data-status="warning"]')
    I.see('Tetapkan username Anda terlebih dahulu', '.my-alert')
})

Scenario('show warning alert when submitting new review without review text', ({ I }) => {
    UsernameHasBeenPreviouslySaved({ I })
    I.click('button.send')

    I.waitForElement('.my-alert')
    I.seeElement('.my-alert[data-status="warning"]')
    I.see('Sepertinya Anda belum menuliskan review', '.my-alert')
})

Scenario('show offline alert when submitting new review when bad network connection or offline ', ({ I }) => {
    UsernameHasBeenPreviouslySaved({ I })

    I.usePuppeteerTo('emulate offline mode', async ({ page }) => {
        await page.setOfflineMode(true)

        I.fillField('input[name=review-text]', 'Restorannya mantap banget, sayang gak ada es teh anget')
        I.click('button.send')

        I.seeElement('.offline-alert')
        I.see('Review Anda gagal ditambahkan', '.offline-alert')
        I.see('Tampaknya Anda memiliki koneksi jaringan yang buruk', '.offline-alert')
        I.seeElement('.close')
        I.click('.close')
    })
})
