import { Paper, Typography } from "@mui/material";

type InfoCardProps = {
  label: string;
  value: string;
};

export default function InfoCard({ label, value }: InfoCardProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        flex: 1,
        p: 2,
        bgcolor: "#222",
        borderColor: "#3a3a3a",
      }}
    >
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        {label}
      </Typography>
      <Typography sx={{ fontWeight: 700 }}>{value}</Typography>
    </Paper>
  );
}
