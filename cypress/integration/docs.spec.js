describe('The Recealer docs tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Add data-open attr to action button', () => {
        cy
            .get('.nav-btn-js')
            .click()
            .should('have.attr', 'data-open', 'true');
    });

    it('set data-open attr to false in action button', () => {
        cy
            .get('.nav-btn-js')
            .click()
            .click()
            .should('have.attr', 'data-open', 'false');
    });
});
