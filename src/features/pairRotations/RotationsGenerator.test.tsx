import RotationsGenerator from "./RotationsGenerator";
import { render, screen, within } from "@testing-library/react";
import crypto from "crypto";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

describe("RotationsGenerator", () => {
  it("should not have accessibility violations", async () => {
    const { container } = render(<RotationsGenerator />);
    const memberNamesCombobox = screen.getByRole("combobox", {
      name: "member names",
    });
    enterMemberNames(memberNamesCombobox, 3);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  describe("member names input", () => {
    it("should be displayed", () => {
      render(<RotationsGenerator />);

      const memberNamesCombobox = screen.getByRole("combobox", {
        name: "member names",
      });
      expect(memberNamesCombobox).toBeVisible();
    });

    it("should have 'Add names (maximum 20, seperated by Enter)' placeholder", () => {
      render(<RotationsGenerator />);

      const memberNamesCombobox = screen.getByRole("combobox", {
        name: "member names",
      });
      const memberNamesTextbox =
        within(memberNamesCombobox).getByRole("textbox");
      expect(memberNamesTextbox).toHaveAttribute(
        "placeholder",
        "Add names (maximum 20, seperated by Enter)"
      );
    });

    it("should transform typed member name into a chip on pressing enter", () => {
      render(<RotationsGenerator />);

      const memberNamesCombobox = screen.getByRole("combobox", {
        name: "member names",
      });
      const memberName = "Joe";
      userEvent.type(memberNamesCombobox, `${memberName}{enter}`);

      const memberNameChip = within(memberNamesCombobox).getByRole("button", {
        name: memberName,
      });
      expect(memberNameChip).toBeVisible();
    });

    it("should remove member chip on pressing backspace", () => {
      render(<RotationsGenerator />);

      const memberNamesCombobox = screen.getByRole("combobox", {
        name: "member names",
      });
      const memberName = "Joe";
      userEvent.type(memberNamesCombobox, `${memberName}{enter}`);

      const memberNameChip = within(memberNamesCombobox).getByRole("button", {
        name: memberName,
      });
      userEvent.type(memberNamesCombobox, `{backspace}`);
      expect(memberNameChip).not.toBeInTheDocument();
    });

    it("should remove member chip on clicking cancel icon", () => {
      render(<RotationsGenerator />);

      const memberNamesCombobox = screen.getByRole("combobox", {
        name: "member names",
      });
      const memberName = "Joe";
      userEvent.type(memberNamesCombobox, `${memberName}{enter}`);

      const memberNameChip = within(memberNamesCombobox).getByRole("button", {
        name: memberName,
      });
      const cancelIcon = within(memberNameChip).getByTestId("CancelIcon");
      userEvent.click(cancelIcon);
      expect(memberNameChip).not.toBeInTheDocument();
    });

    it("should not allow any characters given 20 unique names have been entered", () => {
      render(<RotationsGenerator />);
      const memberNamesCombobox = screen.getByRole("combobox", {
        name: "member names",
      });
      enterMemberNames(memberNamesCombobox, 20);

      const memberName = "Joe";
      userEvent.type(memberNamesCombobox, `${memberName}`);

      expect(within(memberNamesCombobox).getByRole("textbox")).toHaveValue("");
    });

    it("should not allow more than 70 characters for a member name", () => {
      render(<RotationsGenerator />);
      const memberNamesCombobox = screen.getByRole("combobox", {
        name: "member names",
      });

      const memberName = "#".repeat(71);
      userEvent.type(memberNamesCombobox, `${memberName}`);

      expect(within(memberNamesCombobox).getByRole("textbox")).toHaveValue(
        "#".repeat(70)
      );
    });
  });

  describe("rotation(s)", () => {
    it("should not be present when the no member name has been entered", () => {
      render(<RotationsGenerator />);

      const rotations = screen.queryByRole("list", {
        name: "rotations",
      });
      expect(rotations).not.toBeInTheDocument();
    });

    it("should be generated when the first member name is entered", () => {
      render(<RotationsGenerator />);

      const memberNamesCombobox = screen.getByRole("combobox", {
        name: "member names",
      });
      const memberName = "Joe";
      userEvent.type(memberNamesCombobox, `${memberName}{enter}`);

      const rotations = screen.getByRole("list", {
        name: "rotations",
      });
      expect(rotations).toBeVisible();
    });

    it("should be updated when a subsequent unique member name is entered", () => {
      render(<RotationsGenerator />);

      const memberNamesCombobox = screen.getByRole("combobox", {
        name: "member names",
      });
      const memberNameA = "Joe";
      userEvent.type(memberNamesCombobox, `${memberNameA}{enter}`);

      const rotations = screen.getByRole("list", {
        name: "rotations",
      });
      const pair = within(rotations).getByRole("listitem", {
        name: "rotation 1 pair 1",
      });
      expect(pair).toHaveTextContent(`${memberNameA} & ???`);

      const memberNameB = "Jane";
      userEvent.type(memberNamesCombobox, `${memberNameB}{enter}`);
      expect(pair).toHaveTextContent(`${memberNameA} & ${memberNameB}`);
    });

    it("should be updated when an entered member name is removed", () => {
      render(<RotationsGenerator />);

      const memberNamesCombobox = screen.getByRole("combobox", {
        name: "member names",
      });
      const memberNameA = "Joe";
      userEvent.type(memberNamesCombobox, `${memberNameA}{enter}`);
      const memberNameB = "Jane";
      userEvent.type(memberNamesCombobox, `${memberNameB}{enter}`);

      const rotations = screen.getByRole("list", {
        name: "rotations",
      });
      const pair = within(rotations).getByRole("listitem", {
        name: "rotation 1 pair 1",
      });
      expect(pair).toHaveTextContent(`${memberNameA} & ${memberNameB}`);

      const memberNameBChip = within(memberNamesCombobox).getByRole("button", {
        name: memberNameB,
      });
      const cancelIcon = within(memberNameBChip).getByTestId("CancelIcon");
      userEvent.click(cancelIcon);

      expect(pair).toHaveTextContent(`${memberNameA} & ???`);
    });

    it("should be removed when all the entered member names are removed", () => {
      render(<RotationsGenerator />);

      const memberNamesCombobox = screen.getByRole("combobox", {
        name: "member names",
      });
      const memberName = "Joe";
      userEvent.type(memberNamesCombobox, `${memberName}{enter}`);

      const memberNameChip = within(memberNamesCombobox).getByRole("button", {
        name: memberName,
      });
      const cancelIcon = within(memberNameChip).getByTestId("CancelIcon");
      userEvent.click(cancelIcon);

      const rotations = screen.queryByRole("list", {
        name: "rotations",
      });
      expect(rotations).not.toBeInTheDocument();
    });

    it("should be removed when the clear button is clicked", () => {
      render(<RotationsGenerator />);

      const memberNamesCombobox = screen.getByRole("combobox", {
        name: "member names",
      });
      const memberName = "Joe";
      userEvent.type(memberNamesCombobox, `${memberName}{enter}`);

      const clearButton = within(memberNamesCombobox).getByTestId("CloseIcon");
      userEvent.click(clearButton);

      const rotations = screen.queryByRole("list", {
        name: "rotations",
      });
      expect(rotations).not.toBeInTheDocument();
    });
  });

  const enterMemberNames = (
    memberNamesCombobox: HTMLElement,
    count: number
  ) => {
    while (count--) {
      const memberName = crypto.randomBytes(8).toString("base64");
      userEvent.type(memberNamesCombobox, `${memberName}{enter}`);
      const memberNameChip = screen.getByRole("button", { name: memberName });
      expect(memberNameChip).toBeVisible();
    }
  };
});
