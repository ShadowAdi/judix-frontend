"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { apiClient } from "@/lib/auth";

const caseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  clientName: z.string().min(1, "Client name is required"),
  clientEmail: z.string().email("Invalid email address"),
  caseType: z.string().min(1, "Case type is required"),
  filedDate: z.string().min(1, "Filed date is required"),
  description: z.string().min(1, "Description is required"),
});

type CaseForm = z.infer<typeof caseSchema>;

const caseTypes = [
  "Civil Litigation",
  "Criminal Defense",
  "Family Law",
  "Corporate Law",
  "Real Estate",
  "Personal Injury",
  "Immigration",
  "Intellectual Property",
  "Employment Law",
  "Tax Law",
];

interface CaseFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CaseFormComponent({ onSuccess, onCancel }: CaseFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CaseForm>({
    resolver: zodResolver(caseSchema),
  });

  const onSubmit = async (data: CaseForm) => {
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      await apiClient.post("/api/cases", data);
      setSuccess(true);
      reset();
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create case");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
          Case created successfully!
        </div>
      )}

      <div>
        <Label htmlFor="title">Case Title</Label>
        <Input
          id="title"
          {...register("title")}
          className="mt-1"
          placeholder="Enter case title"
        />
        {errors.title && (
          <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="clientName">Client Name</Label>
          <Input
            id="clientName"
            {...register("clientName")}
            className="mt-1"
            placeholder="Enter client name"
          />
          {errors.clientName && (
            <p className="text-red-600 text-sm mt-1">{errors.clientName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="clientEmail">Client Email</Label>
          <Input
            id="clientEmail"
            type="email"
            {...register("clientEmail")}
            className="mt-1"
            placeholder="Enter client email"
          />
          {errors.clientEmail && (
            <p className="text-red-600 text-sm mt-1">{errors.clientEmail.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="caseType">Case Type</Label>
          <select
            id="caseType"
            {...register("caseType")}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select case type</option>
            {caseTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.caseType && (
            <p className="text-red-600 text-sm mt-1">{errors.caseType.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="filedDate">Filed Date</Label>
          <Input
            id="filedDate"
            type="date"
            {...register("filedDate")}
            className="mt-1"
          />
          {errors.filedDate && (
            <p className="text-red-600 text-sm mt-1">{errors.filedDate.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          className="mt-1"
          placeholder="Enter case description"
          rows={4}
        />
        {errors.description && (
          <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      <div className="flex gap-4 justify-end">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Case"}
        </Button>
      </div>
    </form>
  );
}