import { useTheme } from "@mui/material/styles";

import type { SemanticTokens } from "../tokens/semantic";

/** Convenience accessor for the active theme's semantic tokens. */
export function useSystem(): SemanticTokens {
  return useTheme().system;
}
