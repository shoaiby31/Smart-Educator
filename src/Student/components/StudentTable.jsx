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

import StudentActionsMenu from "./StudentActionsMenu";

const students = [
  {
    id: 1,
    name: "Ali Hassan",
    admissionNumber: "SE-2026-0001",
    email: "ali@gmail.com",
    class: "Grade 10",
    section: "A",
    status: "Active",
  },
  {
    id: 2,
    name: "Ahmed Raza",
    admissionNumber: "SE-2026-0002",
    email: "ahmed@gmail.com",
    class: "Grade 9",
    section: "B",
    status: "Pending",
  },
  {
    id: 3,
    name: "Sara Khan",
    admissionNumber: "SE-2026-0003",
    email: "sara@gmail.com",
    class: "Grade 8",
    section: "A",
    status: "Suspended",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Pending":
      return "warning";
    case "Suspended":
      return "error";
    case "Graduated":
      return "primary";
    default:
      return "default";
  }
};

const StudentTable = () => {
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
            <TableCell>Student</TableCell>
            <TableCell>Admission No.</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Class</TableCell>
            <TableCell>Section</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {students.map((student) => (
            <TableRow
              hover
              key={student.id}
            >
              <TableCell>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={2}
                >
                  <Avatar>
                    {student.name.charAt(0)}
                  </Avatar>

                  <Typography fontWeight={500}>
                    {student.name}
                  </Typography>
                </Box>
              </TableCell>

              <TableCell>
                {student.admissionNumber}
              </TableCell>

              <TableCell>
                {student.email}
              </TableCell>

              <TableCell>
                {student.class}
              </TableCell>

              <TableCell>
                <Chip
                  label={student.section}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </TableCell>

              <TableCell>
                <Chip
                  label={student.status}
                  size="small"
                  color={getStatusColor(student.status)}
                />
              </TableCell>

              <TableCell align="center">
                <StudentActionsMenu
  student={student}
  onView={(student) =>
    console.log("View", student)
  }
  onEdit={(student) =>
    console.log("Edit", student)
  }
  onAssignClass={(student) =>
    console.log("Assign Class", student)
  }
  onChangeStatus={(student) =>
    console.log("Change Status", student)
  }
  onArchive={(student) =>
    console.log("Archive", student)
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

export default StudentTable;