import { generatePairRotations, Pair } from "./generatePairRotations";
import { randomBytes } from "crypto";

describe("generatePairRotations", () => {
  describe("given there are 0 members", () => {
    it("should return 0 rotations", () => {
      const rotations = generatePairRotations([]);
      expect(rotations.length).toEqual(0);
    });
  });

  describe("given there are an odd number of unique members", () => {
    it("should throw error", () => {
      const memberCount = 5;
      const members = generateMembers(memberCount);
      expect(() => generatePairRotations(members)).toThrow(
        "There should be an even number of unique members. Try adding another member"
      );
    });
  });

  describe("given there are at least 2 unique members", () => {
    it("should return (unique member count - 1) rotations", () => {
      const memberCount = 6;
      const rotations = generatePairRotations(generateMembers(memberCount));
      expect(rotations.length).toEqual(memberCount - 1);
    });

    it("should return rotations where every rotation has (unique member count / 2) pairs", () => {
      const memberCount = 4;
      const rotations = generatePairRotations(generateMembers(memberCount));
      rotations.forEach((pairs) =>
        expect(pairs.length).toEqual(memberCount / 2)
      );
    });

    it("should return rotations where every rotation has all members", () => {
      const memberCount = 4;
      const members = generateMembers(memberCount);
      const rotations = generatePairRotations(members);

      rotations.forEach((pairs) =>
        expect(pairs.flat()).toEqual(expect.arrayContaining(members))
      );
    });

    it("should return rotations where every pair is unique across rotations", () => {
      const memberCount = 6;
      const members = generateMembers(memberCount);
      const rotations = generatePairRotations(members);

      const uniquePairs: Pair[] = [];
      const isPairUnique = (testPair: Pair) =>
        !uniquePairs.some(
          (pair) =>
            (pair[0] === testPair[0] && pair[1] === testPair[1]) ||
            (pair[0] === testPair[1] && pair[1] === testPair[0])
        );

      const pairs = rotations.flat();
      pairs.forEach((pair) => {
        expect(isPairUnique(pair)).toEqual(true);
        uniquePairs.push(pair);
      });
    });
  });
});

const generateMembers = (count: number) => {
  const members = [...(Array(count) as number[])].map(() =>
    randomBytes(8).toString("base64")
  );
  members.push(members[0]); // adding a duplicate
  return members;
};
