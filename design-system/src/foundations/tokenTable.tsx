import { Box, Stack } from "@mui/material";

import { Text } from "../components/Text";

/** A single color swatch with its name + value. */
export function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <Stack spacing={0.75} sx={{ width: 140 }}>
      <Box
        sx={(theme) => ({
          height: 56,
          borderRadius: "10px",
          bgcolor: value,
          border: `1px solid ${theme.system.border.default}`,
        })}
      />
      <Box>
        <Text preset="dataValue" sx={{ display: "block" }}>
          {name}
        </Text>
        <Text preset="meta" sx={{ display: "block", fontFamily: "monospace" }}>
          {value}
        </Text>
      </Box>
    </Stack>
  );
}

/** A titled group of swatches. */
export function SwatchGroup({
  title,
  entries,
}: {
  title: string;
  entries: Array<[string, string]>;
}) {
  return (
    <Stack spacing={1.5}>
      <Text preset="sectionLabel">{title}</Text>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {entries.map(([name, value]) => (
          <Swatch key={name} name={name} value={value} />
        ))}
      </Box>
    </Stack>
  );
}

/** Generic labeled specimen row. */
export function Spec({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Text preset="meta" sx={{ width: 120, fontFamily: "monospace" }}>
        {label}
      </Text>
      <Box sx={{ flex: 1 }}>{children}</Box>
    </Stack>
  );
}
