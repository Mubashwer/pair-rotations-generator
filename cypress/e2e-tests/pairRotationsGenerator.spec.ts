describe("pair rotations generator", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display app bar with 'Pair Rotations Generator' heading", () => {
    cy.findByRole("banner").within(() => {
      cy.findByRole("heading", { level: 1 })
        .should("be.visible", true)
        .should("have.text", "Pair Rotations Generator");
    });
  });

  it("should display pair rotations generator member names input", () => {
    cy.findByRole("article", { name: "rotations generator" }).within(() => {
      cy.findByRole("combobox", { name: "member names" }).should(
        "be.visible",
        true
      );
    });
  });

  it("should display a pair rotation when the first member name is entered", () => {
    const memberName = "John";
    cy.findByRole("combobox", { name: "member names" }).type(
      `${memberName}{enter}`
    );
    cy.findByRole("list", { name: "rotations" }).within(() => {
      cy.findByRole("listitem", { name: "rotation 1 pair 1" })
        .should("have.text", `${memberName} & ???`)
        .should("be.visible", true);
    });
  });
});
