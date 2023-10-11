describe('product add test', () => {
  it('visits the product page and adds an product', () => {
  cy.visit('/');
  cy.get('button').click();
  cy.contains('a', 'Products').click();
  cy.contains('e2eProductTest').click();
  cy.get('button').contains('Delete').click();
  cy.contains('deleted!');
  });
 });
