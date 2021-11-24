import RotationsGenerator from "./RotationsGenerator";
import { render, screen, within } from "@testing-library/react";
import crypto from "crypto";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

describe("RotationsGenerator", () => {
  it("should not have accessibility violations", async () => {
    const { container } = render(<RotationsGenerator />);
    const memberNamesInput = screen.getByRole("combobox", {
      name: "member names",
    });
    enterMemberNames(memberNamesInput, 3);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  describe("member names input", () => {
    it("should be displayed", () => {
      render(<RotationsGenerator />);

      const memberNamesInput = screen.getByRole("combobox", {
        name: "member names",
      });
      expect(memberNamesInput).toBeVisible();
    });

    it("should have 'Add names (maximum 20, seperated by Enter)' placeholder", () => {
      render(<RotationsGenerator />);

      const memberNamesInput = screen.getByRole("combobox", {
        name: "member names",
      });
      const memberNamesTextBox = within(memberNamesInput).getByRole("textbox");
      expect(memberNamesTextBox).toHaveAttribute(
        "placeholder",
        "Add names (maximum 20, seperated by Enter)"
      );
    });

    it("should transform typed member name into a chip on pressing enter", () => {
      render(<RotationsGenerator />);

      const memberNamesInput = screen.getByRole("combobox", {
        name: "member names",
      });
      const memberName = "Joe";
      userEvent.type(memberNamesInput, `${memberName}{enter}`);

      const memberNameChip = within(memberNamesInput).getByRole("button", {
        name: memberName,
      });
      expect(memberNameChip).toBeVisible();
    });

    it("should remove member chip on pressing backspace", () => {
      render(<RotationsGenerator />);

      const memberNamesInput = screen.getByRole("combobox", {
        name: "member names",
      });
      const memberName = "Joe";
      userEvent.type(memberNamesInput, `${memberName}{enter}`);

      const memberNameChip = within(memberNamesInput).getByRole("button", {
        name: memberName,
      });
      userEvent.type(memberNamesInput, `{backspace}`);
      expect(memberNameChip).not.toBeInTheDocument();
    });

    it("should remove member chip on clicking cancel icon", () => {
      render(<RotationsGenerator />);

      const memberNamesInput = screen.getByRole("combobox", {
        name: "member names",
      });
      const memberName = "Joe";
      userEvent.type(memberNamesInput, `${memberName}{enter}`);

      const memberNameChip = within(memberNamesInput).getByRole("button", {
        name: memberName,
      });
      const cancelIcon = within(memberNameChip).getByTestId("CancelIcon");
      userEvent.click(cancelIcon);
      expect(memberNameChip).not.toBeInTheDocument();
    });

    it("should not allow any characters given 20 unique names have been entered", () => {
      render(<RotationsGenerator />);
      const memberNamesInput = screen.getByRole("combobox", {
        name: "member names",
      });
      enterMemberNames(memberNamesInput, 20);

      const memberName = "Joe";
      userEvent.type(memberNamesInput, `${memberName}`);

      expect(within(memberNamesInput).getByRole("textbox")).toHaveValue("");
    });

    it("should not allow more than 70 characters for a member name", () => {
      render(<RotationsGenerator />);
      const memberNamesInput = screen.getByRole("combobox", {
        name: "member names",
      });

      const memberName = "#".repeat(71);
      userEvent.type(memberNamesInput, `${memberName}`);

      expect(within(memberNamesInput).getByRole("textbox")).toHaveValue(
        "#".repeat(70)
      );
    });
  });

  describe("rotation(s)", () => {
    it("should be generated when the first member name is entered", () => {
      render(<RotationsGenerator />);

      const memberNamesInput = screen.getByRole("combobox", {
        name: "member names",
      });
      const memberName = "Joe";
      userEvent.type(memberNamesInput, `${memberName}{enter}`);

      const rotations = screen.getByRole("list", {
        name: "rotations",
      });
      expect(rotations).toBeVisible();
    });

    it("should be updated when a subsequent unique member name is entered", () => {
      render(<RotationsGenerator />);

      const memberNamesInput = screen.getByRole("combobox", {
        name: "member names",
      });
      const memberNameA = "Joe";
      userEvent.type(memberNamesInput, `${memberNameA}{enter}`);

      const rotations = screen.getByRole("list", {
        name: "rotations",
      });
      const pair = within(rotations).getByRole("listitem", {
        name: "rotation 1 pair 1",
      });
      expect(pair).toHaveTextContent(`${memberNameA} & ???`);

      const memberNameB = "Jane";
      userEvent.type(memberNamesInput, `${memberNameB}{enter}`);
      expect(pair).toHaveTextContent(`${memberNameA} & ${memberNameB}`);
    });

    it("should be updated when an entered member name is removed", () => {
      render(<RotationsGenerator />);

      const memberNamesInput = screen.getByRole("combobox", {
        name: "member names",
      });
      const memberNameA = "Joe";
      userEvent.type(memberNamesInput, `${memberNameA}{enter}`);
      const memberNameB = "Jane";
      userEvent.type(memberNamesInput, `${memberNameB}{enter}`);

      const rotations = screen.getByRole("list", {
        name: "rotations",
      });
      const pair = within(rotations).getByRole("listitem", {
        name: "rotation 1 pair 1",
      });
      expect(pair).toHaveTextContent(`${memberNameA} & ${memberNameB}`);

      const memberNameBChip = within(memberNamesInput).getByRole("button", {
        name: memberNameB,
      });
      const cancelIcon = within(memberNameBChip).getByTestId("CancelIcon");
      userEvent.click(cancelIcon);

      expect(pair).toHaveTextContent(`${memberNameA} & ???`);
    });

    it("should be removed when all the entered member names are removed", async () => {
      render(<RotationsGenerator />);

      const memberNamesInput = screen.getByRole("combobox", {
        name: "member names",
      });
      const memberName = "Joe";
      userEvent.type(memberNamesInput, `${memberName}{enter}`);

      const memberNameChip = within(memberNamesInput).getByRole("button", {
        name: memberName,
      });
      const cancelIcon = within(memberNameChip).getByTestId("CancelIcon");
      userEvent.click(cancelIcon);

      const rotations = await screen.findByRole("list", {
        name: "rotations",
      });
      expect(rotations).toBeEmptyDOMElement();
    });

    it("should be removed when the clear button is clicked", async () => {
      render(<RotationsGenerator />);

      const memberNamesInput = screen.getByRole("combobox", {
        name: "member names",
      });
      const memberName = "Joe";
      userEvent.type(memberNamesInput, `${memberName}{enter}`);

      const clearButton = await within(memberNamesInput).findByTestId(
        "CloseIcon"
      );
      userEvent.click(clearButton);

      const rotations = await screen.findByRole("list", {
        name: "rotations",
      });
      expect(rotations).toBeEmptyDOMElement();
    });
  });

  const enterMemberNames = (memberNamesInput: HTMLElement, count: number) => {
    while (count--) {
      const memberName = crypto.randomBytes(8).toString("base64");
      userEvent.type(memberNamesInput, `${memberName}{enter}`);
      const memberNameChip = screen.getByRole("button", { name: memberName });
      expect(memberNameChip).toBeVisible();
    }
  };
});
