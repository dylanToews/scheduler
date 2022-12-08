describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should Navigate to Tuesday", () => {
    cy.visit("/")
      .contains("li", "Tuesday")
      .click()
      .should("have.css", "background-color", "rgb(242, 242, 242)");
  });

});