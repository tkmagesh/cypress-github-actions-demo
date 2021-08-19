/// <reference types="cypress" />

describe("Greeter", () => {
    it("Should display greet message when greeted", () => {
        const appUrl = Cypress.env().app_url
        cy.visit(appUrl);
        cy.fixture('greeter-data.json').then(greeterData => {
            cy.get('#txtUserName').as('userName') // creating the alias
            cy.get('@userName').type(greeterData.name);
            cy.get('[type="button"]')
                .click();
            cy
                .get('.message')
                .should('contain', `Hi ${greeterData.name}, Have a good day!`);
        });
    });
});