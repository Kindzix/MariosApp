class AddMariosPage {
  typeUserName(userName: string) {
    cy.get('input[placeholder="Who you want to recognize?"]').type(userName);
  }

  selectUser(userName: string) {
    cy.contains(userName).click();
  }

  selectCategory() {
    cy.get('.category-name').first().click();
  }

  typeTitle(title: string) {
    cy.get('input[name="theme"]').type(title);
  }

  typeComment(comment: string) {
    cy.get('textarea[name="message"]').type(comment);
  }

  clickAddMariosButton() {
    cy.get('.add-marios-button').click();
  }

  checkErrorMessage(message: string) {
    cy.contains(message).should('be.visible');
  }
}

export const addMariosPage = new AddMariosPage();
