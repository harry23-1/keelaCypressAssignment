import { contactPage } from "../../support/keela-assignment/contact .po";

describe('Visit URL in Cypress', function() {
    beforeEach(() => {
        cy.login();
    });

    it('should able to add the contract', ()=> {
      cy.intercept('POST', '/api/contacts', {
      statusCode: 200,
      headers: { 'content-type': 'application/json' },
      response: { success: true }
    }).as('addContact');
      cy.contains('Contacts').click()
      contactPage.addContact().click()
      contactPage.fname().type('hari')
      contactPage.email().type('aryalhari86@gmail.com')
      contactPage.lname().type()
      contactPage.saveButton().click()
      cy.wait('@addContact')
      .its('response.body')
      .should('deep.equal', { success: true });
    });

    it('should be able to edit the contact', () => {
      cy.intercept('PUT', '/api/contacts/*', {
      statusCode: 200,
      headers: { 'content-type': 'application/json' },
      response: { message: 'Contact Successfully Updated' }
      }).as('updateContact')
      
      cy.contains('Contacts').click()
      contactPage.selectTable().first().click()
      contactPage.selectTable().click()
      contactPage.lname().clear().type('arryaaalll')
      contactPage.saveButton().click()
      cy.wait('@updateContact')
      cy.get('@updateContact').should((xhr) => {
      expect(xhr.response.body).to.have.property('message', 'Contact Successfully Updated')
      })
      })

      it('should delete contact', () => {
        cy.contains('Contacts').click()
        contactPage.selectTable().first().check()
        contactPage.actionDropdown().select('Delete')
        contactPage.deleteContains().type('DELETE').conformDelete().click()
      
        cy.intercept('DELETE', '**/contacts/**').then((xhr) => {
          expect(xhr.status).to.eq(200)
        })
      })
      
      })
      
  

