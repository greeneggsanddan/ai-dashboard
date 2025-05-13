'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import Markdown from 'react-markdown';
import { LoaderCircle } from 'lucide-react';

interface SummaryDialogProps {
  summary: string | null;
  loading: boolean;
}

export default function SummaryDialog({
  summary,
  loading,
}: SummaryDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" disabled={loading}>
          {loading ? (
            <>
              Generating AI summary
              <LoaderCircle className="ml-1 h-4 w-4 animate-spin" />
            </>
          ) : (
            'View summary'
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">AI Summary</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[calc(90vh-8rem)]">
          <Markdown>{summary || `No README available.`}</Markdown>
        </div>
      </DialogContent>
    </Dialog>
  );
}
