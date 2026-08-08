/**
 * Custom hook for managing category form state and validation
 */

import { useState } from "react";

interface CategoryFormData {
  name: string;
}

interface UseCategoryFormProps {
  onSubmit: (data: CategoryFormData) => Promise<void>;
}

export function useCategoryForm({ onSubmit }: UseCategoryFormProps) {
  const [formData, setFormData] = useState<CategoryFormData>({ name: "" });
  const [errors, setErrors] = useState<Partial<CategoryFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (value: string) => {
    setFormData({ name: value });
    if (errors.name) {
      setErrors({});
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CategoryFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({ name: "" });
      setErrors({});
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
}
