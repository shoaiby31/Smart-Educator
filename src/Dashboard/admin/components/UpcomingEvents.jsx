import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";

const events = [
  {
    id: 1,
    title: "Science Quiz",
    subtitle: "Tomorrow • Grade 10",
    type: "Quiz",
    icon: <QuizRoundedIcon />,
    color: "primary",
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting",
    subtitle: "15 August • School Hall",
    type: "Event",
    icon: <EventRoundedIcon />,
    color: "success",
  },
  {
    id: 3,
    title: "Homework Submission",
    subtitle: "Mathematics • Friday",
    type: "Assignment",
    icon: <AssignmentRoundedIcon />,
    color: "warning",
  },
  {
    id: 4,
    title: "Independence Day Holiday",
    subtitle: "14 August",
    type: "Holiday",
    icon: <CampaignRoundedIcon />,
    color: "secondary",
  },
];

const UpcomingEvents = () => {
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
        <Typography
          variant="h5"
          fontWeight={700}
          mb={2}
        >
          Upcoming Events
        </Typography>

        <List disablePadding>
          {events.map((event, index) => (
            <React.Fragment key={event.id}>
              <ListItem disableGutters>
                <ListItemAvatar>
                  <Avatar color={event.color}>
                    {event.icon}
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={event.title}
                  secondary={event.subtitle}
                />

                <Chip
                  label={event.type}
                  color={event.color}
                  size="small"
                />
              </ListItem>

              {index !== events.length - 1 && (
                <Divider />
              )}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;