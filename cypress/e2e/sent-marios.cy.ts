describe('SentMariosComponent', () => {
  beforeEach(() => {
    cy.visit('/sent-marios');
  });

  it('should navigate back to home page when "BACK" button is clicked', () => {
    cy.get('.back-button-row button').click();
    cy.url().should('include', Cypress.config().baseUrl);
  });

  it('should display "SENT MARIOS:" heading', () => {
    cy.get('.sent-marios').should('contain', 'SENT MARIOS:');
  });

  it('should display sent marios', () => {
    cy.get('.grid-mario-container .rectangle-mario').should('have.length.at.least', 1);
  });

  it('should open info dialog when button is clicked', () => {
    cy.get('.example-button-pop button').click({force: true});
    cy.get('.dialog-content').should('be.visible');
  });
});
