import { useRef, useState, useEffect } from "react";
import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Stack,
    Typography,
} from "@mui/material";
const MAX_FILE_SIZE = 2 * 1024 * 1024;

const ImageUploader = ({
    imageUrl,
    onUpload,
    loading = false,
    title = "Upload Image",
    buttonText = "Choose Image",
    size = 120,
    shape = "circle",
}) => {
    const inputRef = useRef(null);

    const [preview, setPreview] = useState(null);
    const previewRef = useRef(null);

    const handleChange = async (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            return;
        }

        if (previewRef.current) {
            URL.revokeObjectURL(previewRef.current);
        }

        const objectUrl = URL.createObjectURL(file);

        previewRef.current = objectUrl;

        setPreview(objectUrl);

        try {
            await onUpload(file);
        } finally {
            event.target.value = "";
        }
    };

    useEffect(() => {
        return () => {
            if (previewRef.current) {
                URL.revokeObjectURL(previewRef.current);
            }
        };
    }, []);

    return (
        <Stack
            spacing={2}
            alignItems="center"
        >
            <Typography
                variant="h6"
                fontWeight={600}
            >
                {title}
            </Typography>

            <Avatar
                src={preview || imageUrl}
                variant={shape === "square" ? "rounded" : "circular"}
                sx={{
                    width: size,
                    height: size,
                }}
            />

            <input
                hidden
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleChange}
            />

            <Button
                variant="contained"
                disabled={loading}
                onClick={() => inputRef.current.click()}
            >
                {loading ? (
                    <>
                        <CircularProgress
                            size={18}
                            sx={{ mr: 1 }}
                        />
                        Uploading...
                    </>
                ) : (
                    buttonText
                )}
            </Button>
        </Stack>
    );
};

export default ImageUploader;