Cypress.Commands.add('logInViaUI', (email, password) => {
    cy.get('[placeholder="Username or Email"]')
        .type(email)

    cy.get('[placeholder="Password"]')
        .type(password)

    cy.get('[type="submit"]')
        .click()
});

Cypress.Commands.add('typeTextInTextArea', (text) => {
    cy.get('textarea')
        .clear()
        .type(text)
        .type('{enter}')
});

Cypress.Commands.add('clickUserProfile', (username) => {
    cy.get('span.username').contains(username)
        .click()
        .get('.item-profile')
        .click()
})




