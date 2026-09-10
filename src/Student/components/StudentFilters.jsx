import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

const StudentFilters = () => {
  const [filters, setFilters] = useState({
    search: "",
    class: "",
    section: "",
    status: "",
    sort: "",
  });

  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      search: "",
      class: "",
      section: "",
      status: "",
      sort: "",
    });
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              label="Search Student"
              placeholder="Name, Email or Admission No."
              value={filters.search}
              onChange={(e) =>
                handleChange("search", e.target.value)
              }
              InputProps={{
                startAdornment: (
                  <SearchRoundedIcon sx={{ mr: 1 }} />
                ),
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              select
              fullWidth
              size="small"
              label="Class"
              value={filters.class}
              onChange={(e) =>
                handleChange("class", e.target.value)
              }
            >
              <MenuItem value="">All Classes</MenuItem>
              <MenuItem value="6">Grade 6</MenuItem>
              <MenuItem value="7">Grade 7</MenuItem>
              <MenuItem value="8">Grade 8</MenuItem>
              <MenuItem value="9">Grade 9</MenuItem>
              <MenuItem value="10">Grade 10</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              select
              fullWidth
              size="small"
              label="Section"
              value={filters.section}
              onChange={(e) =>
                handleChange("section", e.target.value)
              }
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="C">C</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              select
              fullWidth
              size="small"
              label="Status"
              value={filters.status}
              onChange={(e) =>
                handleChange("status", e.target.value)
              }
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="graduated">Graduated</MenuItem>
              <MenuItem value="suspended">Suspended</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 1 }}>
            <TextField
              select
              fullWidth
              size="small"
              label="Sort"
              value={filters.sort}
              onChange={(e) =>
                handleChange("sort", e.target.value)
              }
            >
              <MenuItem value="">Default</MenuItem>
              <MenuItem value="name">
                Name
              </MenuItem>
              <MenuItem value="newest">
                Newest
              </MenuItem>
              <MenuItem value="oldest">
                Oldest
              </MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 1 }}>
            <Stack
              height="100%"
              justifyContent="center"
            >
              <Button
                fullWidth
                variant="outlined"
                startIcon={<RestartAltRoundedIcon />}
                onClick={handleReset}
              >
                Clear
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StudentFilters;