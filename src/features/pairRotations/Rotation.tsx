import { List, ListItem, Typography } from "@mui/material";

export interface RotationProps {
  rotationNumber: number;
  pairs: [string, string][];
}

const Rotation = ({ rotationNumber, pairs }: RotationProps): JSX.Element => (
  <section>
    <Typography variant="h6" component="h2" sx={{ fontWeight: "bold" }}>
      Rotation {rotationNumber}
    </Typography>
    <List aria-label={`rotation ${rotationNumber} pairs`}>
      {pairs.map(([memberA, memberB], index) => (
        <ListItem
          aria-label={`rotation ${rotationNumber} pair ${index + 1}`}
          key={index}
          disableGutters
        >
          <Typography variant="body1">
            {memberA} {"&"} {memberB}
          </Typography>
        </ListItem>
      ))}
    </List>
  </section>
);

export default Rotation;
