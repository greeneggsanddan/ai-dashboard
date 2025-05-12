'use client';

import { useEffect, useState } from 'react';
import { fetchRepos } from './actions/data';
import { generateSummary } from './actions/actions';
import { Repo } from './lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/ui/card';

export default function Home() {
  const [repos, setRepos] = useState<Repo[]>([]);

  // Fetch the repositories
  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        const data = await fetchRepos();
        if (mounted) {
          setRepos(data);
        }
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    }

    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  const repoList = repos.map((repo) => (
    <Card key={repo.id}>
      <CardHeader>
        <CardTitle>{repo.full_name}</CardTitle>
        <CardDescription>{repo.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Name: {repo.name}</p>
        <p>Description: {repo.description}</p>
        <p>Summary: {repo.summary}</p>
        <p>Language: {repo.language}</p>
        <p>Stars: {repo.stargazers_count}</p>
        <p>Forks: {repo.forks_count}</p>
        <p>Issues: {repo.open_issues_count}</p>
      </CardContent>
    </Card>
  ));

  return (
    <div className="min-h-screen p-20 font-[family-name:var(--font-geist-sans)]">
      <div>{repoList}</div>
    </div>
  );
}
