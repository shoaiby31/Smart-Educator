import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

const ClassFilters = () => {
  const [filters, setFilters] = useState({
    search: "",
    grade: "",
    section: "",
    teacher: "",
    status: "",
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
      grade: "",
      section: "",
      teacher: "",
      status: "",
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
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              size="small"
              label="Search Class"
              placeholder="Grade 10 - A"
              value={filters.search}
              onChange={(e) =>
                handleChange("search", e.target.value)
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              select
              fullWidth
              size="small"
              label="Grade"
              value={filters.grade}
              onChange={(e) =>
                handleChange("grade", e.target.value)
              }
            >
              <MenuItem value="">All Grades</MenuItem>
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
              <MenuItem value="D">D</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              select
              fullWidth
              size="small"
              label="Teacher"
              value={filters.teacher}
              onChange={(e) =>
                handleChange("teacher", e.target.value)
              }
            >
              <MenuItem value="">All Teachers</MenuItem>
              <MenuItem value="ahmed">Ahmed Khan</MenuItem>
              <MenuItem value="ali">Ali Raza</MenuItem>
              <MenuItem value="fatima">Fatima Noor</MenuItem>
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
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="archived">Archived</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 1 }}>
            <Stack justifyContent="center" height="100%">
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

export default ClassFilters;