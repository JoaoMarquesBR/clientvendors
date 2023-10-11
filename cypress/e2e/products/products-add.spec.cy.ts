describe('product add test', () => {
  it('visits the product page and adds an product', () => {
  cy.visit('/');
  cy.get('button').click();
  cy.contains('a', 'Products').click();
  cy.contains('control_point').click();
  cy.get('input[formcontrolname=productId]').clear();
  cy.get('input[formcontrolname=productId]').type('e2eID');

  cy.get('mat-select[formcontrolname="vendor"]').click();
  cy.get('mat-option').contains('Marques').click();

  cy.get('input[formcontrolname=productName]').clear();
  cy.get('input[formcontrolname=productName]').type('e2eProductTest');

  cy.get('input[formcontrolname=retailPrice]').clear();
  cy.get('input[formcontrolname=retailPrice]').type('400');

  cy.get('input[formcontrolname=costPrice]').clear();
  cy.get('input[formcontrolname=costPrice]').type('200');


  cy.get('.mat-expansion-indicator').eq(0).click();
  // cy.get('.mat-expansion-indicator').eq(1).click();
  cy.contains('.mat-expansion-panel-header', 'Inventory Information').click();
  cy.get('input[formcontrolname=rop]').clear();
  cy.get('input[formcontrolname=rop]').type('5');

  cy.get('input[formcontrolname=eoq]').clear();
  cy.get('input[formcontrolname=eoq]').type('10');

  cy.get('input[formcontrolname=qoh]').clear();
  cy.get('input[formcontrolname=qoh]').type('20');


  cy.get('input[formcontrolname=qoo]').clear();
  cy.get('input[formcontrolname=qoo]').type('20');

  cy.get('button').contains('Save').click();
  cy.contains('added!');
  });
 });
