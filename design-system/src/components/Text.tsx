import { Typography, type TypographyProps } from "@mui/material";

export type TextPreset =
  | "title"
  | "bannerLabel"
  | "sectionLabel"
  | "dataLabel"
  | "dataValue"
  | "meta"
  | "body";

export type TextProps = Omit<TypographyProps, "variant"> & {
  /** Named typographic role from the type scale. */
  preset?: TextPreset;
};

/** Presets whose default color is the secondary text tone. */
const secondaryPresets = new Set<TextPreset>(["dataLabel", "meta"]);

/**
 * Typographic primitive bound to the design-system type scale, so bespoke
 * mono-label `sx` blocks collapse to `<Text preset="dataLabel" />`.
 */
export function Text({ preset = "body", sx, ...rest }: TextProps) {
  const variant = preset === "title" ? "subtitle1" : preset === "body" ? "body2" : preset;
  return (
    <Typography
      variant={variant as TypographyProps["variant"]}
      sx={[
        (theme) => ({
          color: secondaryPresets.has(preset)
            ? theme.system.text.secondary
            : theme.system.text.primary,
          ...(preset === "title" ? { fontSize: 17, fontWeight: 700, lineHeight: 1.25 } : {}),
          ...(preset === "body" ? { fontSize: 13.5, lineHeight: 1.55 } : {}),
        }),
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      {...rest}
    />
  );
}
