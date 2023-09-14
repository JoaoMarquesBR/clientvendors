describe('employee page test', () => {
  it('Visits the vendors project page', () => {
  cy.visit('/');
  cy.get('button').click();
  cy.contains('a', 'Vendors').click();
  cy.contains('Vendors loaded');
  });
 });
