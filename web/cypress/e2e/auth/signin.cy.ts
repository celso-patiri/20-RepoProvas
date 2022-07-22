/// <reference types="cypress" />
describe("Login", () => {
  it("should login successfully", () => {
    cy.visit("http://localhost:5173/signin");

    cy.get("input[name=email]").type("celsola@test.com");
    cy.get("input[name=password]").type("mypassword123");
    cy.get("button").click();
  });
});
