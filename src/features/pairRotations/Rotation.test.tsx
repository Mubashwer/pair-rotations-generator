import Rotation from "./Rotation";
import { render, screen, within } from "@testing-library/react";

describe("Rotation", () => {
  it("should display rotation number", () => {
    const rotationNumber = 1;
    const pairs: [string, string][] = [
      ["John", "Jane"],
      ["Joe", "Dan"],
    ];

    render(<Rotation rotationNumber={rotationNumber} pairs={pairs} />);

    const rotationHeading = screen.getByRole("heading", { level: 2 });
    expect(rotationHeading).toHaveTextContent(`Rotation ${rotationNumber}`);
  });

  it("should display rotation pairs", () => {
    const rotationNumber = 1;
    const pairs: [string, string][] = [
      ["John", "Jane"],
      ["Joe", "Dan"],
    ];

    render(<Rotation rotationNumber={rotationNumber} pairs={pairs} />);

    const pairsContainer = screen.getByRole("list", {
      name: `rotation ${rotationNumber} pairs`,
    });
    pairs.forEach((pair, index) => {
      const pairElement = within(pairsContainer).getByRole("listitem", {
        name: `rotation ${rotationNumber} pair ${index + 1}`,
      });
      expect(pairElement).toHaveTextContent(`${pair[0]} & ${pair[1]}`);
    });
  });
});
