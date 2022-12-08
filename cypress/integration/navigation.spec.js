describe("Navigation", () => {
  
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should Navigate to Tuesday", () => {
    cy.visit("/")
      .contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });

});