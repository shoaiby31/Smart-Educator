import {
  Avatar,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const TeacherTable = ({ teachers }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Teacher</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Qualification</TableCell>
            <TableCell>Experience</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {teachers.map((teacher) => (
            <TableRow
              hover
              key={teacher.id}
            >
              <TableCell>
                <Avatar
                  src={teacher.photoURL}
                  sx={{
                    width: 40,
                    height: 40,
                    mr: 2,
                    display: "inline-flex",
                    verticalAlign: "middle",
                  }}
                />

                <Typography
                  component="span"
                  fontWeight={600}
                >
                  {teacher.firstName} {teacher.lastName}
                </Typography>
              </TableCell>

              <TableCell>{teacher.phone || "-"}</TableCell>

              <TableCell>
                {teacher.qualification || "-"}
              </TableCell>

              <TableCell>
                {teacher.experience || "-"}
              </TableCell>

              <TableCell>
                <Chip
                  size="small"
                  label={teacher.status || "active"}
                  color={
                    teacher.status === "inactive"
                      ? "default"
                      : "success"
                  }
                />
              </TableCell>

              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default TeacherTable;