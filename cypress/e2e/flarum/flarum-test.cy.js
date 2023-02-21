const {randomString} = require("../../fixtures/get-random-string");
describe('test flarum web site', () => {
    let testData;
    before(() => {
        cy.fixture('testData').then((data) => {
            testData = data;
        });
    });

    it('enter, login and change bio', () => {
        cy.visit('/');
        cy.checkIfVisible(HEADER_LOGO);
        cy.clickOnElement(ITEM_LOGIN);
        cy.logInViaUI(testData.email, testData.password);
        cy.clickUserProfile(testData.username);
        cy.assertTextOfElement(USER_CARD, testData.username);
        cy.assertTextOfElement(STATUS, testData.status);
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
        cy.reload();
        cy.checkIfBioAssert(testData.newPhrase);
    });
});