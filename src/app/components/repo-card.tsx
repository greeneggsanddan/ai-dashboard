'use client';

import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter,
} from './ui/card';
import { Star, Split, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Repo } from '../lib/types';
import SummaryDialog from './summary-dialog';
import { useState, useEffect } from 'react';
import { generateSummary } from '../actions/actions';

export default function RepoCard({ repo }: { repo: Repo }) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    async function loadSummary() {
      try {
        setLoading(true);
        const data = await generateSummary(repo.owner.login, repo.name);
        console.log('Summary:', data);
        if (mounted) {
          setSummary(data);
        }
      } catch (error) {
        console.error('Error generating summary:', error);
      } finally {
        setLoading(false);
      }
    }

    loadSummary();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Card className="flex flex-col h-full gap-4">
      <CardHeader className="gap-1">
        <CardDescription>{repo.owner.login}</CardDescription>
        <CardTitle className="text-2xl text-sky-600 hover:underline">
          <a href={`${repo.html_url}`}>{repo.name}</a>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4 justify-between">
        <p className={`${!repo.description ? 'italic' : ''}`}>
          {repo.description || 'No description available.'}
        </p>
        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex gap-1.5 items-center">
            <Star className="w-4.5 " />
            <p>{repo.stargazers_count}</p>
          </div>
          <div className="flex gap-1.5 items-center">
            <Split className="w-4.5" />
            <p>{repo.forks_count}</p>
          </div>
          <div className="flex gap-1.5 items-center">
            <Clock className="w-4.5" />
            <p>Updated {format(repo.updated_at, 'MMM d')}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <SummaryDialog summary={summary} loading={loading} />
      </CardFooter>
    </Card>
  );
}
