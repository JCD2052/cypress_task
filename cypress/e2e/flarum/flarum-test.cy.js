describe('test flarum web site', () => {
    let test_data
    before(() => {
        cy.fixture('test_data').then((data) => {
            test_data = data;
        })
    })


    it('enter, login and change bio', () => {
        cy.visit('/')
            .get('.Header-logo')
            .should('be.visible')

        cy.get('.item-logIn')
            .click()

        cy.logInViaUI(test_data.email, test_data.password)

        cy.clickUserProfile(test_data.username)

        cy.get('.UserCard-identity')
            .should('contain.text', test_data.username)

        cy.get('.item-lastSeen')
            .should('contain.text', test_data.status)

        const random_str = `qwerty ${Math.floor(Math.random() * 11)}`;

        cy.get('.item-bio')
            .click()

        cy.typeTextInTextArea(random_str)

        cy.get('.item-bio')
            .should('have.text', random_str)

        cy.get('.item-bio')
            .click()

        cy.intercept('POST', '/api/users/*', (req) => {
            req.continue((req) => {
                req.body.data.attributes.bio = test_data.stubbed_text
            })
        }).as('stubPostRequest')

        cy.typeTextInTextArea(test_data.new_phrase)

        cy.wait('@stubPostRequest')

        cy.get('.item-bio')
            .should('have.text', test_data.stubbed_text)

        cy.reload()

        cy.get('.item-bio')
            .should('have.text', test_data.new_phrase)
    })
})

