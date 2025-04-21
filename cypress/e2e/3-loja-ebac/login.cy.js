///<reference types="cypress"/>

describe('Funcionalidade: Login',() => {
  it('Deve fazer login com sucesso',()=>{
    cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    cy.get('#username').type('barbara.teste@teste.com.br')
    cy.get('#password').type('@Cesso123')
    cy.get('.woocommerce-form > .button').click()

    cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain','Olá, barbara.teste (não é barbara.teste? Sair)')
  })

})