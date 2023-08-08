describe('HomeComponent', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to received marios page when "Received Marios" button is clicked', () => {
    cy.get('.received button').click();
    cy.url().should('include', '/received-marios');
  });

  it('should navigate to sent marios page when "Sent Marios" button is clicked', () => {
    cy.get('.sent button').click();
    cy.url().should('include', '/sent-marios');
  });

  it('should navigate to add marios page when "ADD MARIOS" button is clicked', () => {
    cy.get('.mario-button-row button').click();
    cy.url().should('include', '/add-marios');
  });

  it('should display correct count of received marios', () => {
    cy.get('.marios-count').eq(0).should('have.text', '0');
  });

  it('should display correct count of sent marios', () => {
    cy.get('.marios-count').eq(1).should('have.text', '0');
  });

  it('should display last received marios', () => {
    cy.get('.grid-mario-container .rectangle-mario').should('have.length.at.least', 1);
  });

  it('should display last sent marios', () => {
    cy.get('.grid-mario-container .rectangle-mario').should('have.length.at.least', 1);
  });
});
