import React, { useRef, useState, useEffect } from "react";

import {
  Avatar,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";

import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";

const ProfilePhotoUploader = ({
  image = "",
  onImageChange,
}) => {

  const [preview, setPreview] = useState("");

useEffect(() => {
  if (!image) {
    setPreview("");
    return;
  }

  if (typeof image === "string") {
    setPreview(image);
    return;
  }

  const objectUrl = URL.createObjectURL(image);
  setPreview(objectUrl);

  return () => URL.revokeObjectURL(objectUrl);
}, [image]);
  const inputRef = useRef(null);

const handleSelectImage = (event) => {
  const file = event.target.files?.[0];

  if (!file) return;

  if (onImageChange) {
    onImageChange(file);
  }
};
  return (
    <Stack spacing={3} alignItems="center" sx={{ mb: 2 }} >
      <Box sx={{ position: "relative" }}>
        <Avatar
          src={preview}
          sx={{
            width: 140,
            height: 140,
            fontSize: 48,
            bgcolor: "primary.main",
            border: "4px solid",
            borderColor: "#fff",
            boxShadow:
              "0 12px 35px rgba(0,0,0,.12)",
          }}
        />

        <Button
          size="small"
          variant="contained"
          onClick={() => inputRef.current?.click()}
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            minWidth: 44,
            width: 44,
            height: 44,
            borderRadius: "50%",
            p: 0,
          }}
        >
          <PhotoCameraRoundedIcon />
        </Button>
      </Box>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleSelectImage}
      />

      <Stack
        spacing={1}
        alignItems="center"
      >
        <Typography
          variant="h6"
          fontWeight={700}
        >
          Profile Photo
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          maxWidth={400}
        >
          Upload a clear profile picture. This photo
          will be visible throughout SmartEducator.
        </Typography>

        <Button
          variant="outlined"
          startIcon={<CloudUploadRoundedIcon />}
          onClick={() => inputRef.current?.click()}
          sx={{
            mt: 2,
            borderRadius: 3,
            px: 3,
          }}
        >
          Upload Photo
        </Button>
      </Stack>
    </Stack>
  );
};

export default ProfilePhotoUploader;