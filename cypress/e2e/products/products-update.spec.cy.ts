describe('product add test', () => {
  it('visits the products page and adds an product', () => {
  cy.visit('/');
  cy.get('button').click();
  cy.contains('a', 'Products').click();
  cy.contains('e2eProductTest').click();
  cy.get('input[formcontrolname=retailPrice').clear();
  cy.get('input[formcontrolname=retailPrice').click({ force: true }).type('50.99');
  cy.get('button').contains('Save').click();
  cy.contains('updated!');
  });
 });
