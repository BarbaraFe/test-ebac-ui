///<reference types="cypress"/>
const perfil = require('../../fixtures/perfil.json')
describe('Funcionalidade: Login', () => {

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('minha-conta')
  });

  afterEach(() => {
    //cy.screenshot()
  })

  it('Deve fazer login com sucesso', () => {
    cy.get('#username').type('barbara.teste@teste.com.br')
    cy.get('#password').type('@Cesso123')
    cy.get('.woocommerce-form > .button').click()
    cy.get('.woocommerce-MyAccount-content > :nth-child(2)')
      .should('contain', 'Olá, barbara.teste (não é barbara.teste? Sair)')
  });

  it('Deve exibir uma mensagem de erro ao inserir o usuário inválido', () => {
    cy.get('#username').type('barbara.test@teste.com.br')
    cy.get('#password').type('@Cesso123')
    cy.get('.woocommerce-form > .button').click()
    //cy.get('.woocommerce-error').should('contain','Endereço de e-mail desconhecido.')
    cy.get('.woocommerce-error').should('exist')
  });

  it('Deve exibir uma mensagem de erro ao inserir senha inválida', () => {
    cy.get('#username').type('barbara.teste@teste.com.br')
    cy.get('#password').type('@Cesso1234')
    cy.get('.woocommerce-form > .button').click()
    cy.get('.woocommerce-error')
      .should('contain', 'Erro: A senha fornecida para o e-mail barbara.teste@teste.com.br está incorreta. Perdeu a senha?')
    cy.get('.woocommerce-error').should('exist')
  });

  it('Deve fazer login com sucesso - Usando massa de dados', () => {
    cy.get('#username').type(perfil.usuario)
    cy.get('#password').type(perfil.senha)
    cy.get('.woocommerce-form > .button').click()
    cy.get('.woocommerce-MyAccount-content > :nth-child(2)')
      .should('exist')
  });

  it('Deve fazer login com sucesso - Usando Fixture', () => {
    cy.fixture('perfil').then(dados => {
      cy.get('#username').type(dados.usuario, { log: false })
      cy.get('#password').type(dados.senha, { log: false })
      cy.get('.woocommerce-form > .button').click()
      cy.get('.woocommerce-MyAccount-content > :nth-child(2)')
        .should('exist')
    })
  });
  it('Deve fazer login com sucesso - Usando comandos customizados', () => {
    cy.login('barbara.teste@teste.com.br', '@Cesso123')
    cy.get('.woocommerce-MyAccount-content > :nth-child(2)')
      .should('exist')
  });
})