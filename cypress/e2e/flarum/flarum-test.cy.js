const {randomString} = require("../../fixtures/get-random-string");
const {STATUS, USER_CARD, ITEM_BIO, HEADER_LOGO, ITEM_LOGIN, USERNAME_VALUE} = require("../../support/locators");
describe('test flarum web site', () => {
    let testData;
    before(() => {
        cy.fixture('testData').then((data) => {
            testData = data;
        });
    });

    it('enter, login and change bio', () => {
        cy.log('Step 1: Move to Flarum website');
        cy.visit('/');
        cy.checkIfVisible(HEADER_LOGO);
        cy.clickOnElement(ITEM_LOGIN);
        cy.log('Step 2: Login page is open');
        cy.logInViaUI(testData.email, testData.password);
        cy.checkIfVisible(USERNAME_VALUE);
        cy.log('Step 3: Click on user profile');
        cy.clickUserProfile(testData.username);
        cy.assertTextOfElement(USER_CARD, testData.username);
        cy.log('Step 4: Check user status');
        cy.assertTextOfElement(STATUS, testData.status);
        cy.log('Step 5: Update user bio');
        cy.clickOnElement(ITEM_BIO);
        cy.typeTextInTextArea(randomString);
        cy.checkIfBioAssert(randomString);
        cy.clickOnElement(ITEM_BIO);
        cy.intercept('POST', '/api/users/*', (req) => {
            req.continue((res) => {
                res.body.data.attributes.bio = testData.stubbedText
            });
        }).as('stubPostRequest');
        cy.typeTextInTextArea(testData.newPhrase);
        cy.wait('@stubPostRequest');
        cy.checkIfBioAssert(testData.stubbedText);
        cy.log('Step 6: Reload page');
        cy.reload();
        cy.checkIfBioAssert(testData.newPhrase);
    });
});