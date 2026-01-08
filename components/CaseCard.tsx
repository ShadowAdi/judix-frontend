import Link from "next/link";
import { CaseInterface } from "@/lib/auth";
import { Card } from "@/components/ui/card";

interface CaseCardProps {
  case: CaseInterface;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "draft":
      return "bg-yellow-100 text-yellow-800";
    case "closed":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function CaseCard({ case: caseData }: CaseCardProps) {
  return (
    <Link href={`/cases/${caseData._id}`}>
      <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {caseData.title}
          </h3>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              caseData.status
            )}`}
          >
            {caseData.status.replace("-", " ")}
          </span>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div>
            <span className="font-medium">Client:</span> {caseData.clientName}
          </div>
          <div>
            <span className="font-medium">Type:</span> {caseData.caseType}
          </div>
          <div>
            <span className="font-medium">Filed:</span>{" "}
            {new Date(caseData.filedAt).toLocaleDateString()}
          </div>
        </div>
        
        {caseData.description && (
          <p className="mt-3 text-sm text-gray-600 line-clamp-2">
            {caseData.description}
          </p>
        )}
      </Card>
    </Link>
  );
}