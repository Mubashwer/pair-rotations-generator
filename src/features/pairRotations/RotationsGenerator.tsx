import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import Rotations from "./Rotations";

const RotationsGenerator = (): JSX.Element => {
  const maxMembers = 20;
  const maxMemberNameLength = 70;
  const [members, setMembers] = useState<string[]>([]);

  return (
    <article aria-label="rotations generator">
      <Autocomplete
        aria-label="member names"
        freeSolo
        fullWidth
        multiple
        onChange={(_event, newMembers) => setMembers(newMembers)}
        options={Array<string>()}
        renderInput={(params) => (
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
              disabled: members.length >= maxMembers,
              maxLength: maxMemberNameLength,
            }}
            placeholder="Add names (maximum 20, seperated by Enter)"
            variant="standard"
          />
        )}
      />
      <Rotations memberNames={members} />
    </article>
  );
};

export default RotationsGenerator;
