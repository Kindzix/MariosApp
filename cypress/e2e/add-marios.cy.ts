import { addMariosPage } from "../support/pageobject/add-marios-page";

const userName = 'Jagoda Rogala';
const theme = 'Test Theme';
const comment = 'Test Message';

describe('AddMariosComponent', () => {
  beforeEach(() => {
    cy.visit('/add-marios');
  });

  it('should display error when submitting form with no user selected', () => {
    addMariosPage.clickAddMariosButton();
    addMariosPage.checkErrorMessage('Please select a user.');
  });

  it('should display error when submitting form with no category selected', () => {
    addMariosPage.typeUserName(userName);
    addMariosPage.selectUser(userName);
    addMariosPage.clickAddMariosButton();
    addMariosPage.checkErrorMessage('Please select a category.');
  });

  it('should display error when submitting form with no title entered', () => {
    addMariosPage.typeUserName(userName);
    addMariosPage.selectUser(userName);
    addMariosPage.selectCategory();
    addMariosPage.clickAddMariosButton();
    addMariosPage.checkErrorMessage('Please enter a theme.');
  });

  it('should display error when submitting form with no comment entered', () => {
    addMariosPage.typeUserName(userName);
    addMariosPage.selectUser(userName);
    addMariosPage.selectCategory();
    addMariosPage.typeTitle(theme);
    addMariosPage.clickAddMariosButton();
    addMariosPage.checkErrorMessage('Please enter a comment.');
  });

  it('should successfully submit the form with valid data', () => {
    addMariosPage.typeUserName(userName);
    addMariosPage.selectUser(userName);
    addMariosPage.selectCategory();
    addMariosPage.typeTitle(theme);
    addMariosPage.typeComment(comment);
    addMariosPage.clickAddMariosButton();

    cy.url().should('include', Cypress.config().baseUrl);
  });
});
