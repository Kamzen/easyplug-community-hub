import React, { useRef } from "react";
import { useUploadCatalog } from "../hooks/useUploadCatalog";
import { useToast } from "../hooks/use-toast";
import { Box, Button, Typography, CircularProgress, TextField } from "@mui/material";

export default function UploadCatalogPage() {
  const { toast } = useToast();
  const uploadCatalog = useUploadCatalog();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [storeId, setStoreId] = React.useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadCatalog.mutate({ storeId, file: e.target.files[0] }, {
        onSuccess: (data) => {
          toast({ title: "Catalog uploaded!", description: data.message });
        },
        onError: (err: any) => {
          toast({ title: "Upload failed", description: err?.response?.data?.message || err.message, variant: "destructive" });
        }
      });
    }
  };

  return (
    <Box sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>Upload Catalog</Typography>
      <TextField
        label="Store ID"
        value={storeId}
        onChange={e => setStoreId(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        component="label"
        disabled={uploadCatalog.isPending}
      >
        {uploadCatalog.isPending ? <CircularProgress size={24} /> : "Select File"}
        <input
          type="file"
          hidden
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </Button>
    </Box>
  );
}
