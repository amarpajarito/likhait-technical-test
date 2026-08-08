/**
 * Form component for adding categories
 */

import React from "react";
import { TextField, Button } from "../vibes";
import { useCategoryForm } from "../hooks/useCategoryForm";

interface CategoryFormProps {
  onSubmit: (data: { name: string }) => Promise<void>;
  onCancel?: () => void;
}

export function CategoryForm({ onSubmit, onCancel }: CategoryFormProps) {
  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useCategoryForm({ onSubmit });

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const buttonGroupStyle: React.CSSProperties = {
    display: "flex",
    gap: "0.5rem",
    marginTop: "0.5rem",
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <TextField
        label="Category Name"
        type="text"
        placeholder="Enter category name"
        value={formData.name}
        onChange={(e) => handleChange(e.target.value)}
        error={errors.name}
        fullWidth
        required
      />

      <div style={buttonGroupStyle}>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          fullWidth
        >
          {isSubmitting ? "Submitting..." : "Add Category"}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
