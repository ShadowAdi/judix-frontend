"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Archive, Edit2 } from "lucide-react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Case, apiClient } from "@/lib/auth";

export default function CaseDetail() {
  const [case_, setCase] = useState<Case | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  
  const params = useParams();
  const router = useRouter();
  const caseId = params.id as string;

  useEffect(() => {
    fetchCase();
  }, [caseId]);

  const fetchCase = async () => {
    try {
      const data = await apiClient.get(`/api/cases/${caseId}`);
      setCase(data);
      setEditedDescription(data.description);
      setEditedStatus(data.status);
    } catch (error) {
      console.error("Failed to fetch case:", error);
      // For demo purposes, use mock data
      const mockCase = mockCases.find(c => c.id === caseId);
      if (mockCase) {
        setCase(mockCase);
        setEditedDescription(mockCase.description);
        setEditedStatus(mockCase.status);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!case_) return;

    setIsSaving(true);
    try {
      const updatedCase = await apiClient.patch(`/api/cases/${caseId}`, {
        description: editedDescription,
        status: editedStatus,
      });
      setCase(updatedCase);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update case:", error);
      // For demo, just update local state
      setCase({
        ...case_,
        description: editedDescription,
        status: editedStatus as "open" | "in-progress" | "closed",
        updatedAt: new Date().toISOString(),
      });
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = async () => {
    if (!case_) return;
    
    try {
      await apiClient.patch(`/api/cases/${caseId}`, { status: "closed" });
      setCase({ ...case_, status: "closed" });
      setEditedStatus("closed");
    } catch (error) {
      console.error("Failed to close case:", error);
    }
  };

  const handleArchive = async () => {
    if (!case_) return;
    
    try {
      await apiClient.patch(`/api/cases/${caseId}`, { isArchived: true });
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to archive case:", error);
      // For demo, redirect anyway
      router.push("/dashboard");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!case_) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Case Not Found</h1>
            <Link href="/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="mr-4">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Case Details</h1>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="p-8">
            {/* Case Header */}
            <div className="flex justify-between items-start mb-8">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{case_.title}</h2>
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      case_.status
                    )}`}
                  >
                    {case_.status.replace("-", " ")}
                  </span>
                  <span className="text-gray-500">
                    Filed: {new Date(case_.filedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleArchive}
                  className="text-orange-600 hover:text-orange-700"
                >
                  <Archive className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Case Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600 font-medium">Name:</span>
                    <span className="ml-2 text-gray-900">{case_.clientName}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 font-medium">Email:</span>
                    <span className="ml-2 text-gray-900">{case_.clientEmail}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Case Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600 font-medium">Type:</span>
                    <span className="ml-2 text-gray-900">{case_.caseType}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 font-medium">Status:</span>
                    {isEditing ? (
                      <select
                        value={editedStatus}
                        onChange={(e) => setEditedStatus(e.target.value)}
                        className="ml-2 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="open">Open</option>
                        <option value="in-progress">In Progress</option>
                        <option value="closed">Closed</option>
                      </select>
                    ) : (
                      <span className="ml-2 text-gray-900">{case_.status.replace("-", " ")}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
              {isEditing ? (
                <div>
                  <Textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    rows={6}
                    className="w-full"
                  />
                  <div className="flex gap-2 mt-4">
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 whitespace-pre-wrap">{case_.description}</p>
              )}
            </div>

            {/* Actions */}
            {!isEditing && case_.status !== "closed" && (
              <div className="flex gap-4">
                <Button onClick={handleClose} variant="outline">
                  Close Case
                </Button>
              </div>
            )}

            {/* Metadata */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="text-sm text-gray-500 space-y-1">
                <div>Created: {new Date(case_.createdAt).toLocaleString()}</div>
                <div>Last updated: {new Date(case_.updatedAt).toLocaleString()}</div>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  );
}

// Mock data for demo
const mockCases = [
  {
    id: "1",
    title: "Smith vs. Johnson Contract Dispute",
    clientName: "John Smith",
    clientEmail: "john@example.com",
    caseType: "Civil Litigation",
    filedDate: "2024-01-15",
    description: "Contract dispute regarding construction services. The client entered into a construction agreement with Johnson Construction Company on December 1, 2023, for the renovation of their commercial property. The dispute arose when the contractor failed to complete the work within the agreed timeframe and the quality of work did not meet the specifications outlined in the contract.\n\nKey issues include:\n- Delay in project completion (60 days overdue)\n- Substandard materials used\n- Additional costs not disclosed upfront\n- Failure to obtain necessary permits\n\nThe client is seeking damages for the delays, cost of remedial work, and lost business revenue during the extended construction period.",
    status: "in-progress" as const,
    isArchived: false,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T15:30:00Z",
  },
  {
    id: "2",
    title: "Estate Planning for Wilson Family",
    clientName: "Sarah Wilson",
    clientEmail: "sarah@example.com",
    caseType: "Estate Planning",
    filedDate: "2024-01-10",
    description: "Comprehensive estate planning including will and trust setup",
    status: "open" as const,
    isArchived: false,
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-01-10T09:00:00Z",
  },
  {
    id: "3",
    title: "Personal Injury Case - Davis",
    clientName: "Michael Davis",
    clientEmail: "michael@example.com",
    caseType: "Personal Injury",
    filedDate: "2024-01-05",
    description: "Car accident personal injury claim",
    status: "closed" as const,
    isArchived: false,
    createdAt: "2024-01-05T14:00:00Z",
    updatedAt: "2024-01-25T16:45:00Z",
  },
];