import {ITEM_BIO, ITEM_PROFILE, LOGIN_SUBMIT, PASSWORD, TEXT_AREA, USERNAME, USERNAME_VALUE} from "./locators";


Cypress.Commands.add('logInViaUI', (email, password) => {
    cy.get(USERNAME)
        .type(email)

    cy.get(PASSWORD)
        .type(password)

    cy.clickOnElement(LOGIN_SUBMIT);
});


Cypress.Commands.add('typeTextInTextArea', (text) => {
    cy.get(TEXT_AREA)
        .clear()
        .type(text)
        .type('{enter}')
});

Cypress.Commands.add('clickUserProfile', (username) => {
    cy.get(USERNAME_VALUE).contains(username)
        .click()
        .get(ITEM_PROFILE)
        .click()
});

Cypress.Commands.add('clickOnElement', (locator) => {
    cy.get(locator).click();
});

Cypress.Commands.add('assertTextOfElement', (locator, valueToMatch) => {
    cy.get(locator)
        .should('contain.text', valueToMatch);
});

Cypress.Commands.add('checkIfVisible', (locator) => {
    cy.get(locator)
        .should('be.visible');
});

Cypress.Commands.add('checkIfBioAssert', (valueToMatch) => {
    cy.assertTextOfElement(ITEM_BIO, valueToMatch);
});

// Cypress.Commands.add('logInfo', (message) => {
//     cy.task('log', message);
// });







