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
import { Button } from './ui/button';
import { LoaderCircle } from 'lucide-react';

export default function RepoCard({ repo }: { repo: Repo }) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSummary = async () => {
    setLoading(true);
    try {
      const response = await generateSummary(repo.owner.login, repo.name);
      setSummary(response);
    } catch (error) {
      console.error('Error generating summary:', error);
    } finally {
      setLoading(false);
    }
  };

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
        {summary ? (
          <SummaryDialog repoName={repo.name} summary={summary} />
        ) : (
          <Button
            className="w-full"
            onClick={handleSummary}
            disabled={loading}
            aria-label={`Generate AI summary for ${repo.name}`}
          >
            {loading ? (
              <>
                <span>Generating AI summary</span>
                <LoaderCircle className="ml-1 h-4 w-4 animate-spin" />
              </>
            ) : (
              'Generate AI summary'
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
