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

interface SummaryDialogProps {
  repoName: string;
  summary: string | null;
}

export default function SummaryDialog({
  repoName,
  summary,
}: SummaryDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full"
          aria-label={`View AI summary for ${repoName}`}
        >
          View Summary
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {`${repoName}`} AI Summary
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[calc(90vh-8rem)]">
          <Markdown>{summary || `No README available.`}</Markdown>
        </div>
      </DialogContent>
    </Dialog>
  );
}
