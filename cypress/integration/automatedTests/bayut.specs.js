
describe('SDET Automated Tests', () => {
    beforeEach(() => {
        cy.visit('https://www.bayut.com/')
    })

    const location = "Dubai Marina";
    it('Search for apartments to buy in Dubai Marina', () => {

        // search for apartments
        cy.get('ul[aria-label="Location filter"]').type(location).type('{enter}');


        // Select purpose
        cy.get('span').contains("Rent").click();
        // select buy in purpose
        cy.get('button[aria-label="Buy"]').click();

        //Search for properties
        cy.get('a[aria-label="Find button"]').click();
        
        // Get all properties and assert for location in description
        cy.get('div[aria-label="Location"]').each((element)=>{
            cy.wrap(element).should("contain.text", location);
        })
    })


    it('Validate links in Popular Searches to Rent - Dubai Apartmnets', ()=>{

        // select To Rent in the popular searches in UAE
        cy.get('div').contains('To Rent', {matchCase: true}).click();

        // get the list of Dubai apartments from there
        cy.get('a[href*="/to-rent/apartments/dubai/"]').each((url)=>{
            cy.request(url.prop('href'))
            .its('status')
            .should('eq',200)
        });
    })

});