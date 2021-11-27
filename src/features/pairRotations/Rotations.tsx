import { List, ListItem } from "@mui/material";
import { useMemo } from "react";
import { generatePairRotations } from "./generatePairRotations";
import Rotation from "./Rotation";

export interface RotationsProps {
  memberNames: string[];
}

const Rotations = ({ memberNames }: RotationsProps): JSX.Element => {
  const rotations = useMemo(() => {
    const members = [...memberNames];
    if (members.length % 2 !== 0) {
      members.push("???");
    }
    return generatePairRotations(members);
  }, [memberNames]);

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
};

export default Rotations;
