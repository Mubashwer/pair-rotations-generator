import { List, ListItem } from "@mui/material";
import { useMemo } from "react";
import { generatePairRotations } from "./generatePairRotations";
import Rotation from "./Rotation";

export interface RotationsProps {
  memberNames: string[];
}

const Rotations = ({ memberNames }: RotationsProps): JSX.Element => {
  return useMemo(() => {
    const members =
      memberNames.length % 2 === 0 ? [...memberNames] : [...memberNames, "???"];
    const rotations = generatePairRotations(members);

    return (
      <List aria-label="rotations">
        {rotations.map((pairs, index) => (
          <ListItem
            aria-label={`rotation ${index + 1}`}
            key={index}
            disableGutters
          >
            <Rotation rotationNumber={index + 1} pairs={pairs} />
          </ListItem>
        ))}
      </List>
    );
  }, [memberNames]);
};

export default Rotations;
