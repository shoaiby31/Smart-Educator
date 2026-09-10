import React from "react";
import {
  Avatar,
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import ClassActionsMenu from "./ClassActionsMenu";

const classes = [
  {
    id: 1,
    name: "Grade 10 - A",
    grade: "10",
    section: "A",
    teacher: "Ahmed Khan",
    students: 38,
    capacity: 40,
    status: "Active",
  },
  {
    id: 2,
    name: "Grade 10 - B",
    grade: "10",
    section: "B",
    teacher: "Fatima Noor",
    students: 34,
    capacity: 40,
    status: "Active",
  },
  {
    id: 3,
    name: "Grade 9 - A",
    grade: "9",
    section: "A",
    teacher: "Ali Raza",
    students: 29,
    capacity: 35,
    status: "Inactive",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "warning";
    case "Archived":
      return "default";
    default:
      return "default";
  }
};

const ClassTable = () => {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Class</TableCell>
            <TableCell>Grade</TableCell>
            <TableCell>Section</TableCell>
            <TableCell>Class Teacher</TableCell>
            <TableCell>Students</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {classes.map((item) => (
            <TableRow hover key={item.id}>
              <TableCell>
                <Typography fontWeight={600}>
                  {item.name}
                </Typography>
              </TableCell>

              <TableCell>
                Grade {item.grade}
              </TableCell>

              <TableCell>
                <Chip
                  label={item.section}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </TableCell>

              <TableCell>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <Avatar
                    sx={{
                      width: 34,
                      height: 34,
                    }}
                  >
                    <PersonRoundedIcon fontSize="small" />
                  </Avatar>

                  <Typography>
                    {item.teacher}
                  </Typography>
                </Box>
              </TableCell>

              <TableCell>
                <Typography fontWeight={500}>
                  {item.students} / {item.capacity}
                </Typography>
              </TableCell>

              <TableCell>
                <Chip
                  label={item.status}
                  color={getStatusColor(item.status)}
                  size="small"
                />
              </TableCell>

              <TableCell align="center">
                <ClassActionsMenu
  classItem={item}
  onView={(value) => console.log("View", value)}
  onEdit={(value) => console.log("Edit", value)}
  onAssignTeacher={(value) =>
    console.log("Assign Teacher", value)
  }
  onAssignStudents={(value) =>
    console.log("Assign Students", value)
  }
  onManageSubjects={(value) =>
    console.log("Manage Subjects", value)
  }
  onArchive={(value) =>
    console.log("Archive", value)
  }
/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClassTable;