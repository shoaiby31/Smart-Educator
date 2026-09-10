import { Box, Stack, Typography } from "@mui/material";

const PageHeader = ({
  title,
  subtitle,
  action,
  mb = 4,
}) => {
  return (
    <Stack
      direction={{
        xs: "column",
        md: "row",
      }}
      justifyContent="space-between"
      alignItems={{
        xs: "flex-start",
        md: "center",
      }}
      spacing={2}
      sx={{
        mb,
      }}
    >
      <Box>
        <Typography
          variant="h4"
          gutterBottom
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="body1"
            color="text.secondary"
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      {action && <Box>{action}</Box>}
    </Stack>
  );
};

export default PageHeader;