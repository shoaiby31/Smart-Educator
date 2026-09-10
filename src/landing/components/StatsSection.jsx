import React from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

const stats = [
  {
    value: "50+",
    title: "Schools",
  },
  {
    value: "500+",
    title: "Teachers",
  },
  {
    value: "10K+",
    title: "Students",
  },
  {
    value: "100K+",
    title: "Attendance Records",
  },
];

const StatsSection = () => {
  return (
    <Box
      sx={{
        py: 8,
        bgcolor: "grey.50",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {stats.map((item) => (
            <Grid
              key={item.title}
              size={{ xs: 6, md: 3 }}
            >
              <Card
                elevation={0}
                sx={{
                  textAlign: "center",
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "divider",
                  height: "100%",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h3"
                    fontWeight={700}
                    color="primary"
                  >
                    {item.value}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    mt={1}
                  >
                    {item.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default StatsSection;