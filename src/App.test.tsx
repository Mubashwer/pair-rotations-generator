import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should show app bar with 'Pair Rotations Generator' heading", () => {
    render(<App />);

    const appBar = screen.getByRole("banner");
    expect(appBar).toBeVisible();
    const heading = screen.getByRole("heading", { level: 1 });
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
