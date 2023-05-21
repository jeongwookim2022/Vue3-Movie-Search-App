/**
 * Access to the search(main) page.
 * Set the movie title 'frozen' with 30 results.
 * Push 'Apply' button to search a movie list.
 * Page shows 30 results of a movie list.
 * Access to the movie detail page.
 * Check the information in detail page.
 */
describe("Movie Search(Frozen II)", () => {
  it("Access to the search(main) page.", () => {
    cy.visit("/")
    cy.get("header .nav-link.active")
      .contains('Search')
  })

  it("Set the movie title 'frozen' with 30 results.", () => {
    cy.get("input.form-control")
      .type('frozen')
    cy.get('select.form-select:nth-child(2)')
      .select('30')
    cy.get("button.btn")
      .contains('Apply')
      .click()
    cy.wait(2000)
    cy.get('.movie')
      .should('have.length', 30)
  })

  it("Access tot he movie detail page.", () => {
    cy.get('.movie .title')
      .contains('Frozen II')
      .click()
  })

  it("Check the information in detail page.", () => {
    cy.url() // http://localhost:8080/movie/tt4520988
      .should('include', '/movie/tt4520988')
    cy.wait(1000)
    cy.get("header .nav-link.active")
      .contains("Movie")
    cy.get('.title')
      .contains("Frozen II")
  })
})