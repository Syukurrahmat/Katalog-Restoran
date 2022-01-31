const assert = require('assert')

Feature('ReadMore Button')

const randomInteger = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + min)

Before(({ I }) => {
    I.amOnPage('#')
    I.waitForInvisible('.is-loading:not([loading=lazy])')

    I.seeElement('resto-card')
    I.click('a.seeDetail', locate('resto-card').first())
})

Scenario('showing readmore button on mobile', ({ I }) => {
    const widthScreenMobile = randomInteger(200, 768)

    I.resizeWindow(widthScreenMobile, 738)
    I.seeElement('.button.readmore')
    I.see('Baca Selengkapnya', '.button.readmore')
})

Scenario('not showing readmore button on dekstop', ({ I }) => {
    const widthScreenDekstop = randomInteger(768, 1500)

    I.resizeWindow(widthScreenDekstop, 738)
    I.dontSeeElement('.button.readmore')
})

Scenario('clicking readmore button', async ({ I }) => {
    const widthScreenMobile = randomInteger(200, 768)
    I.resizeWindow(widthScreenMobile, 738)

    I.seeElement('.button.readmore')
    I.see('Baca Selengkapnya', '.button.readmore')
    I.dontSeeElement('.description.more')
    assert.strictEqual(await I.grabCssPropertyFrom('.description', 'display'), '-webkit-box')

    I.click('.button.readmore')

    I.see('Baca Sekurangnya', '.button.readmore')
    I.seeElement('.description.more')
    assert.strictEqual(await I.grabCssPropertyFrom('.description', 'display'), 'block')

    I.click('.button.readmore')

    I.see('Baca Selengkapnya', '.button.readmore')
    I.dontSeeElement('.description.more')
    assert.strictEqual(await I.grabCssPropertyFrom('.description', 'display'), '-webkit-box')
})
