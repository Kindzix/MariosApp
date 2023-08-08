describe('ReceivedMariosComponent', () => {
  beforeEach(() => {
    cy.visit('/received-marios');
  });

  it('should navigate back to home page when "BACK" button is clicked', () => {
    cy.get('.back-button-row button').click();
    cy.url().should('include', Cypress.config().baseUrl);
  });

  it('should display "RECEIVED MARIOS:" heading', () => {
    cy.get('.received-marios').should('contain', 'RECEIVED MARIOS:');
  });

  it('should display last received marios', () => {
    cy.get('.grid-mario-container .rectangle-mario').should('have.length.at.least', 1);
  });

  it('should open info dialog when button is clicked', () => {
    cy.get('.example-button-pop button').first().click();
    cy.get('.mat-dialog-container').should('be.visible');
  });
});
