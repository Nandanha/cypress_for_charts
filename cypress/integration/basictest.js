/// <reference types="Cypress" />
import { labels,texts,charttitles} from '../labels'

beforeEach(() => {
    cy.visit('https://frappe.io/charts');
    // let the chart load by observing the rendered bars
    cy.get('.frappe-chart g.dataset-0 rect').should('have.length', 20)
  })
 
  it('Title checks of all the charts in the page', () => {
    const rectangles = 'text.title'
  
    charttitles.forEach((charttitle, k) => {
      cy.get(rectangles)
        .eq(k)
        .wait(500)
      cy.get('svg[class="frappe-chart chart"] text[class="title"]', { log: false }).should('contain', charttitle)
    })
  })



 it('shows tooltip for each imported label in bar chart', () => {
    const rectangles = '.frappe-chart g.dataset-0 rect'
  
    labels.forEach((label, k) => {
      cy.get(rectangles)
        .eq(k)
        .trigger('mousemove')
        .wait(500)
  
      cy.get('.graph-svg-tip', { log: false }).should('contain', label)
    })
  })

it('shows tooltip for each imported label in line chart and data validation in tooltip', () => {
    const rectangles = '.frappe-chart g.dataset-0 circle'
  
    texts.forEach((text, k) => {
      cy.get(rectangles)
        .eq(k)
        .trigger('mousemove')
        .wait(500)
  
     // cy.get('.graph-svg-tip', { log: false }).should('contain', label)
      cy.get('.graph-svg-tip', { log: false }).should('contain', text)
      cy.get('.graph-svg-tip').invoke('text').then((text1) => {
        cy.log(text1)
        expect(text).not.to.be.null
        expect(text).to.be.greaterThan('0')
    })
})


    
  })
