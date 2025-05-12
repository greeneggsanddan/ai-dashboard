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
import { Star } from 'lucide-react';
import { Button } from './components/ui/button';
import RangeSelect from './components/range-select';

export default function Home() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [range, setRange] = useState('all-time');

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
    <Card key={repo.id} className='flex flex-col h-full'>
      <CardHeader className='gap-1'>
        <CardDescription>{repo.owner}</CardDescription>
        <CardTitle className='text-2xl text-sky-600 hover:underline'>
          <a href={`${repo.html_url}`}>{repo.name}</a>
        </CardTitle>
      </CardHeader>
      <CardContent className='flex-grow flex flex-col gap-4 justify-between'>
        <p className={`${!repo.description ? 'italic' : ''}`}>
          {repo.description || 'No description available.'}
        </p>
        <div className='flex gap-1'>
          <Star />
          <p>{repo.stargazers_count}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full'>Generate Summary</Button>
      </CardFooter>
    </Card>
  ));

  return (
    <div className="container mx-auto min-h-screen p-4 md:p-8 font-[family-name:var(--font-geist-sans)]">
      <div className='flex justify-between'>
        <h1 className="text-3xl font-bold tracking-tight mb-4">Trending AI Agent Frameworks</h1>
        <RangeSelect
          range={range}
          setRange={setRange}
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>{repoList}</div>
    </div>
  );
}
