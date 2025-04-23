///<reference types="cypress"/>
import produtosPage from "../../support/page-objects/produtos.page";

describe('Funcionalidade: Produtos', () => {
    beforeEach(() => {
        produtosPage.visitarUrl()

    });
    it('Deve selecionar um produto da lista', () => {
        produtosPage.buscarProdutoLista('Aero Daily Fitness Tee')
        cy.get('#tab-title-description > a')
            .should('contain', 'Descrição')
    });

    it('Deve buscar um produto com sucesso', () => {
        let produto = 'Aero Daily Fitness Tee'
        produtosPage.buscarProduto(produto)
        cy.get('.product_title').
            should('contain', produto)
    });
    it('Deve visitar a página do produto', () => {
        produtosPage.visitarProduto('aether gym pant')
        cy.get('.product_title').
            should('contain', produto)
    });
    it('Deve adicionar produto ao carrinho', () => {
        let qtd = 7
        cy.get('.topbar-inner > :nth-child(1) > .list-inline > :nth-child(2)').click()
        cy.login('barbara.teste@teste.com.br', '@Cesso123')
        produtosPage.buscarProduto('Aether Gym Pant')
        produtosPage.addProdutoCarrinho('32', 'Blue', qtd)
        cy.get('.woocommerce-message')
            .should('contain', qtd + ' × “Aether Gym Pant” foram adicionados no seu carrinho.')
    });
    it.only('Deve adicionar produto ao carrinho - Usando a massa de dados', () => {
        cy.fixture('produtos').then(dados => {
            cy.get('.topbar-inner > :nth-child(1) > .list-inline > :nth-child(2)').click()
            cy.login('barbara.teste@teste.com.br', '@Cesso123')
            produtosPage.buscarProduto(dados[0].nomeProduto)
            produtosPage.addProdutoCarrinho(
                dados[0].tamanho,
                dados[0].cor,
                dados[0].quantidade)
            cy.get('.woocommerce-message')
                .should('contain', dados[0].nomeProduto)
        })
    });
});