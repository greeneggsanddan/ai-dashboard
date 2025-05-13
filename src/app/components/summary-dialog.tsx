'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { generateSummary } from '../actions/actions';
import { Repo } from '../lib/types';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';

export default function SummaryDialog({ repo }: { repo: Repo }) {
  const [summary, setSummary] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadSummary() {
      try {
        const data = await generateSummary(repo.owner.login, repo.name);
        if (mounted) {
          setSummary(data);
        }
      } catch (error) {
        console.error('Error generating summary:', error);
      }
    }

    loadSummary();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Generate Summary</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-2xl'>AI Summary</DialogTitle>
        </DialogHeader>
        <div>
          <Markdown>{summary}</Markdown>
        </div>
      </DialogContent>
    </Dialog>
  );
}
