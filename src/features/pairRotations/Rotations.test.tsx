import Rotations from "./Rotations";
import { render, screen, within } from "@testing-library/react";

describe("Rotations", () => {
  it("should display rotations", () => {
    const memberNames = ["John", "Jane", "Joe", "Dan"];

    render(<Rotations memberNames={memberNames} />);

    const rotations = screen.getByRole("list", {
      name: "rotations",
    });
    expect(rotations).toBeVisible();

    const rotation1 = within(rotations).getByRole("listitem", {
      name: "rotation 1",
    });
    expect(rotation1).toBeVisible();

    const rotation2 = within(rotations).getByRole("listitem", {
      name: "rotation 2",
    });
    expect(rotation2).toBeVisible();
  });

  it("should add member ??? in rotations given there are odd number of unique members", () => {
    const memberNames = ["John", "Jane", "Joe"];

    render(<Rotations memberNames={memberNames} />);

    const rotations = screen.getByRole("list", {
      name: "rotations",
    });
    expect(rotations).toHaveTextContent(/(John & \?\?\?)|(\?\?\?) & John/);
    expect(rotations).toHaveTextContent(/(Jane & \?\?\?)|(\?\?\?) & Jane/);
    expect(rotations).toHaveTextContent(/(Joe & \?\?\?)|(\?\?\?) & Joe/);
  });
});
