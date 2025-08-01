import React, { useRef, useState } from "react";
import { useAddItem } from "../hooks/useAddItem";
import { useToast } from "../hooks/use-toast";
import { Box, Button, Typography, CircularProgress, TextField } from "@mui/material";

export default function AddItemPage() {
  const { toast } = useToast();
  const addItem = useAddItem();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [catalogId, setCatalogId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catalogId || !name || !description || !price) {
      toast({ title: "All fields are required", variant: "destructive" });
      return;
    }
    addItem.mutate(
      {
        catalogId,
        name,
        description,
        price: parseFloat(price),
        images,
      },
      {
        onSuccess: () => {
          toast({ title: "Item added!", description: "Your item is now listed." });
          setName("");
          setDescription("");
          setPrice("");
          setImages([]);
        },
        onError: (err: any) => {
          toast({ title: "Add item failed", description: err?.response?.data?.message || err.message, variant: "destructive" });
        },
      }
    );
  };

  return (
    <Box sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>Add Item</Typography>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
        <TextField
          label="Catalog ID"
          value={catalogId}
          onChange={e => setCatalogId(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
          type="number"
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          component="label"
          fullWidth
          sx={{ mb: 2 }}
        >
          Select Images
          <input
            type="file"
            hidden
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </Button>
        {images.length > 0 && (
          <Typography variant="body2" sx={{ mb: 2 }}>{images.length} image(s) selected</Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={addItem.isPending}
        >
          {addItem.isPending ? <CircularProgress size={24} /> : "Add Item"}
        </Button>
      </form>
    </Box>
  );
}
