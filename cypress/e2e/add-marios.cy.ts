describe('AddMariosComponent', () => {
  beforeEach(() => {
    cy.visit('/add-marios');
  });

  it('should display error when submitting form with no user selected', () => {
    cy.get('.add-marios-button').click();
    cy.contains('Please select a user.').should('be.visible');
  });

  it('should display error when submitting form with no category selected', () => {
    cy.get('input[placeholder="Who you want to recognize?"]').type('Jagoda Rogala');
    cy.contains('Jagoda Rogala').click();
    cy.get('.add-marios-button').click();
    cy.contains('Please select a category.').should('be.visible');
  });

  it('should display error when submitting form with no title entered', () => {
    cy.get('input[placeholder="Who you want to recognize?"]').type('Jagoda Rogala');
    cy.contains('Jagoda Rogala').click();

    cy.get('.category-name').first().click();
    cy.get('.add-marios-button').click();
    cy.contains('Please enter a theme.').should('be.visible');
  });

  it('should display error when submitting form with no comment entered', () => {
    cy.get('input[placeholder="Who you want to recognize?"]').type('Jagoda Rogala');
    cy.contains('Jagoda Rogala').click();

    cy.get('.category-name').first().click();
    cy.get('input[name="theme"]').type('Test Theme');
    cy.get('.add-marios-button').click();
    cy.contains('Please enter a comment.').should('be.visible');
  });

  it('should successfully submit the form with valid data', () => {
    cy.get('input[placeholder="Who you want to recognize?"]').type('Jagoda Rogala');
    cy.contains('Jagoda Rogala').click();

    cy.get('.category-name').first().click();
    cy.get('input[name="theme"]').type('Test Theme');
    cy.get('textarea[name="message"]').type('Test Message');
    cy.get('.add-marios-button').click();
  });
});
