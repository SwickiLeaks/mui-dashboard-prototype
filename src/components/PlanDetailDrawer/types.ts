export type Selection =
  | { kind: "release"; releaseId: string }
  | { kind: "target"; targetId: string };
