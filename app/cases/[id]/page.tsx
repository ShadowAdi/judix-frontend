"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Archive, Edit2 } from "lucide-react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { EditCaseFormComponent } from "@/components/EditCaseForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CaseInterface, caseService } from "@/lib/auth";
import { getStatusColor } from "@/lib/status-case";

export default function CaseDetail() {
  const [case_, setCase] = useState<CaseInterface | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);

  const params = useParams();
  const router = useRouter();
  const caseId = params.id as string;

  const fetchCase = async () => {
    try {
      const data = await caseService.getById(caseId);
      setCase(data);
    } catch (error) {
      console.error("Failed to fetch case:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCase();
  }, [caseId]);

  const handleEditSuccess = (updatedCase: CaseInterface) => {
    setCase(updatedCase);
    setShowEditForm(false);
  };

  const handleClose = async () => {
    if (!case_) return;

    try {
      await caseService.update(caseId, { status: "closed" });
      setCase({ ...case_, status: "closed" });
    } catch (error) {
      console.error("Failed to close case:", error);
    }
  };

  const handleArchive = async () => {
    if (!case_) return;

    try {
      await caseService.update(caseId,{ isArchived: true });
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to archive case:", error);
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
              <Button className="cursor-pointer!">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="mr-4 cursor-pointer!">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Case Details</h1>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="p-8">
            <div className="flex justify-between items-start mb-8">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{case_.title}</h2>
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      case_.status
                    )}`}
                  >
                    {case_.status}
                  </span>
                  <span className="text-gray-500">
                    Filed: {new Date(case_.filedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer!"
                  onClick={() => setShowEditForm(true)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleArchive}
                  className="text-orange-600 hover:text-orange-700 cursor-pointer!"
                >
                  <Archive className="h-4 w-4" />
                </Button>
              </div>
            </div>

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
                    <span className="ml-2 text-gray-900">{case_.status.replace("-", " ")}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{case_.description || "No description provided"}</p>
            </div>

            {case_.status !== "closed" && (
              <div className="flex gap-4 mb-8">
                <Button onClick={handleClose} variant="outline" className="cursor-pointer!">
                  Close Case
                </Button>
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="text-sm text-gray-500 space-y-1">
                <div>Created: {new Date(case_.createdAt).toLocaleString()}</div>
                <div>Last updated: {new Date(case_.updatedAt).toLocaleString()}</div>
              </div>
            </div>
          </Card>
        </main>

        {/* Edit Case Modal */}
        {showEditForm && (
          <div className="fixed inset-0 bg-black/60 bg-opacity-20 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Edit Case</h3>
              </div>
              <EditCaseFormComponent
                case_={case_}
                onSuccess={handleEditSuccess}
                onCancel={() => setShowEditForm(false)}
              />
            </Card>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
