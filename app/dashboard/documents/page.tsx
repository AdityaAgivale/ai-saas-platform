import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DocumentsList } from "@/components/dashboard/documents-list";

export default function DocumentsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Documents</h1>
          <p className="mt-1 text-sm text-muted">All your generated content in one place.</p>
        </div>
        <Button href="/dashboard/templates" size="sm">
          <Plus size={14} /> New Document
        </Button>
      </div>
      <div className="mt-6">
        <DocumentsList />
      </div>
    </div>
  );
}
