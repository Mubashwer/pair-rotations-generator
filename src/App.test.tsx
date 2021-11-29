import { render, screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import App from "./App";

describe("App", () => {
  it("should not have accessibility violations", async () => {
    const { container } = render(<App />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("should display app bar with 'Pair Rotations Generator' heading", () => {
    render(<App />);

    const appBar = screen.getByRole("banner");
    expect(appBar).toBeVisible();
    const heading = within(appBar).getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Pair Rotations Generator");
  });

  it("should display pair rotations generator", () => {
    render(<App />);

    const rotationsGenerator = screen.getByRole("article", {
      name: "rotations generator",
    });
    expect(rotationsGenerator).toBeVisible();
  });
});
