import { render, screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import App from "./App";

describe("App", () => {
  beforeEach(() => mockMatchMedia());

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

  describe("color scheme", () => {
    it("should use dark theme given user indicated preference for dark color scheme", () => {
      mockMatchMedia("(prefers-color-scheme: dark)");
      render(<App />);
      expect(document.body).toHaveStyle({
        "background-color": "rgb(18, 18, 18)",
        color: "rgb(255, 255, 255)",
      });
    });

    it("should use light theme given user indicated preference for light color scheme", () => {
      mockMatchMedia("(prefers-color-scheme: light)");
      render(<App />);
      expect(document.body).toHaveStyle({
        "background-color": "rgb(255, 255, 255)",
        color: "rgba(0, 0, 0, 0.87)",
      });
    });

    it("should use light theme given user has not indicated preference for any color scheme", () => {
      render(<App />);
      expect(document.body).toHaveStyle({
        "background-color": "rgb(255, 255, 255)",
        color: "rgba(0, 0, 0, 0.87)",
      });
    });
  });

  const mockMatchMedia = (...matches: string[]) => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn((query: string) => ({
        matches: matches.includes(query),
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  };
});
