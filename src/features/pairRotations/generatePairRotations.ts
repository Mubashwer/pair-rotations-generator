export type Pair = [string, string];
export type Rotation = Pair[];

// Uses the Circle Method Scheduling Algorithm
export const generatePairRotations = (memberNames: string[]): Rotation[] => {
  if (memberNames.length < 1) {
    return [];
  }
  // remove duplicates
  const members = Array.from(new Set(memberNames));

  if (members.length % 2 !== 0) {
    throw new Error(
      "There should be an even number of unique members. Try adding another member"
    );
  }
  let numberOfRotations = members.length - 1;

  // split members in halves
  const [membersA, membersB] = [members.splice(0, members.length / 2), members];

  const generatePairs = (): Pair[] =>
    membersA.map((member, index) => [member, membersB[index]]);

  const rotations = [generatePairs()];
  while (--numberOfRotations > 0) {
    // rotate pairs
    membersA.splice(1, 0, membersB.shift()!);
    membersB.push(membersA.pop()!);

    rotations.push(generatePairs());
  }

  return rotations;
};
