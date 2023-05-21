describe('first test', () => {  
  it('Move to the project page', ()=> {
    // cy.visit('http://localhost:8080')
    cy.visit('/')
    cy.get('header .logo')
    cy.get('#hero')
  })
})