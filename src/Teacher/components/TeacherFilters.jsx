import React, { useState } from "react";
import {
  Box,
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

const TeacherFilters = () => {
  const [filters, setFilters] = useState({
    search: "",
    subject: "",
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
      subject: "",
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
              label="Search Teacher"
              placeholder="Name or Email"
              value={filters.search}
              onChange={(e) =>
                handleChange("search", e.target.value)
              }
              InputProps={{
                startAdornment: <SearchRoundedIcon sx={{ mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              select
              fullWidth
              size="small"
              label="Subject"
              value={filters.subject}
              onChange={(e) =>
                handleChange("subject", e.target.value)
              }
            >
              <MenuItem value="">All Subjects</MenuItem>
              <MenuItem value="Mathematics">
                Mathematics
              </MenuItem>
              <MenuItem value="Physics">
                Physics
              </MenuItem>
              <MenuItem value="Chemistry">
                Chemistry
              </MenuItem>
              <MenuItem value="Computer Science">
                Computer Science
              </MenuItem>
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
              <MenuItem value="active">
                Active
              </MenuItem>
              <MenuItem value="leave">
                On Leave
              </MenuItem>
              <MenuItem value="training">
                Training
              </MenuItem>
              <MenuItem value="suspended">
                Suspended
              </MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              select
              fullWidth
              size="small"
              label="Sort By"
              value={filters.sort}
              onChange={(e) =>
                handleChange("sort", e.target.value)
              }
            >
              <MenuItem value="">Default</MenuItem>
              <MenuItem value="name">
                Name (A-Z)
              </MenuItem>
              <MenuItem value="newest">
                Newest
              </MenuItem>
              <MenuItem value="oldest">
                Oldest
              </MenuItem>
              <MenuItem value="workload">
                Workload
              </MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Stack height="100%" justifyContent="center">
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

export default TeacherFilters;