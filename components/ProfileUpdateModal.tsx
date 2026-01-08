/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { User, Edit3, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { authService, getUser, setUser } from "@/lib/auth";
import { toast } from "sonner";

interface ProfileUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ProfileUpdateModal({ isOpen, onClose, onSuccess }: ProfileUpdateModalProps) {
  const currentUser = getUser();
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    bio: currentUser?.bio || ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; bio?: string }>({});

  const validateForm = () => {
    const newErrors: { username?: string; bio?: string } = {};

    if (!formData.username || formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    } else if (formData.username.length > 30) {
      newErrors.username = "Username cannot exceed 30 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = "Username can only contain letters, numbers, and underscores";
    }

    if (formData.bio && formData.bio.length > 500) {
      newErrors.bio = "Bio cannot exceed 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await authService.updateUser({
        username: formData.username.trim(),
        bio: formData.bio?.trim()
      });

      if (result) {
        const updatedUser = await authService.me();
        setUser(updatedUser);
        
        toast.success("Profile updated successfully!");
        onSuccess();
        onClose();
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900">Update Profile</h3>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              disabled={isLoading}
              className={errors.username ? "border-red-500" : ""}
            />
            {errors.username && (
              <p className="text-sm text-red-600">{errors.username}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio (optional)</Label>
            <Textarea
              id="bio"
              placeholder="Tell us a bit about yourself..."
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              disabled={isLoading}
              rows={4}
              className={errors.bio ? "border-red-500" : ""}
            />
            <div className="flex justify-between items-center">
              {errors.bio ? (
                <p className="text-sm text-red-600">{errors.bio}</p>
              ) : (
                <p className="text-sm text-gray-500">
                  {formData.bio.length}/200 characters
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 cursor-pointer!"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 cursor-pointer!"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Updating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Edit3 className="h-4 w-4" />
                  Update Profile
                </div>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}