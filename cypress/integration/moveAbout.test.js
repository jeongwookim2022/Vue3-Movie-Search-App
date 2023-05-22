/**
 * Access to Main page.
 * If About in Header is clicked, can move to About page and see the About info.
 * Access to Movie page.
 * If the user Logo in Header is clicked, can move to About page and see the About info again.
 */

const { zip } = require("lodash")

describe("Move to About page.", ()=> {
  it("Access to Main page.", ()=> {
    cy.visit("/")
    cy.get("header .nav-link.active")
      .contains("Search")
  })

  it("If About in Header is clicked, can move to About page, see the About info and check its url.", ()=> {
    cy.get("header .nav-link")
      .contains("About")
      .click()
    cy.url()
      .should('include', '/about')
    cy.wait(1000)
    cy.get("header .nav-link.active")
      .contains('About')
    cy.get('.name')
      .contains('Jeongwoo Kim')
  })

  it("Access to Movie page.", ()=> {
    cy.get('header .nav-link')
      .contains("Movie")
      .click()
    cy.url()
      .should("include", "/movie")
  })

  it("If the user Logo in Header is clicked, can move to About page and see the About info again.", ()=> {
    cy.get("header .user")
      .click()
    cy.url()
      .should("include", "/about")
    cy.wait(1000)
    cy.get('header .nav-link.active')
      .contains("About")
      .get(".name")
      .contains("Jeongwoo Kim")
  })
})