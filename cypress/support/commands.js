const HEADER_LOGO = '.Header-logo';
const ITEM_LOGIN = '.item-logIn';
const USER_CARD = '.UserCard-identity';
const STATUS = '.item-lastSeen';
const ITEM_BIO = '.item-bio';
const TEXT_AREA = 'textarea';
const ITEM_PROFILE = '.item-profile';
const USERNAME_VALUE = 'span.username';
const USERNAME = '[placeholder="Username or Email"]';
const PASSWORD = '[placeholder="Password"]';
const LOGIN_SUBMIT = '[type="submit"]';

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
        .should('have.text', valueToMatch);
});

Cypress.Commands.add('checkIfVisible', (locator) => {
    cy.get(locator)
        .should('be.visible');
});

Cypress.Commands.add('checkIfBioAssert', (valueToMatch) => {
    cy.assertTextOfElement(ITEM_BIO, valueToMatch);
});







