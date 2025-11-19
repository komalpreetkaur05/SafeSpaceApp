'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

/**
 * ViewReportModal Component
 *
 * A modal to display the details of a generated report.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.report - The report object to display.
 * @param {boolean} props.open - Controls the visibility of the modal.
 * @param {function(): void} props.onClose - Callback function to close the modal.
 * @returns {JSX.Element} The View Report Modal component.
 */
export default function ViewReportModal({ report, open, onClose }) {
  if (!report) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {report.name}
          </DialogTitle>
          <DialogDescription>
            Generated on {new Date(report.created_at).toLocaleString()} • {report.type}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2 bg-gray-50 p-4 rounded-lg border">
          {report.data ? (
            <table className="w-full text-sm text-left border-collapse">
              <tbody>
                {Object.entries(report.data).map(([key, value]) => (
                  <tr key={key} className="border-b last:border-b-0">
                    <td className="py-2 px-4 font-medium capitalize text-gray-700 align-top">
                      {key.replace(/_/g, " ")}
                    </td>
                    <td className="py-2 px-4 text-gray-900">
                      {typeof value === "object" && value !== null
                        ? Object.entries(value).map(([subKey, subValue]) => (
                            <div key={subKey} className="flex">
                              <span className="font-medium w-28 flex-shrink-0">{subKey.replace(/_/g, " ")}:</span>
                              <span>{String(subValue)}</span>
                            </div>
                          ))
                        : String(value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600 text-sm text-center py-8">No preview available</p>
          )}
        </div>

        <DialogFooter className="flex-shrink-0 mt-4">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}