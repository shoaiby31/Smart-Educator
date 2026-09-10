import { Card, CardContent, Stack, Typography, Box } from "@mui/material";

const StatCard = ({
  title,
  value,
  icon,
  color = "primary.main",
  subtitle,
  trend,
  action,
}) => {
  return (
    <Card
      elevation={2}
      sx={{
        height: "100%",
        transition: "all .25s ease",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: (theme) => theme.customShadows.cardHover,
        },
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {title}
            </Typography>

            <Typography
              variant="h4"
              sx={{
                mt: 1,
                mb: 1,
              }}
            >
              {value}
            </Typography>

            {subtitle && (
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {subtitle}
              </Typography>
            )}

            {trend && (
              <Typography
                variant="caption"
                color="success.main"
              >
                {trend}
              </Typography>
            )}
          </Box>

          {icon && (
            <Box
              sx={{
                width: 56,
                height: 56,

                borderRadius: "50%",

                bgcolor: color,

                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                color: "white",

                "& svg": {
                  fontSize: 30,
                },
              }}
            >
              {icon}
            </Box>
          )}
        </Stack>

        {action && (
          <Box sx={{ mt: 2 }}>
            {action}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;