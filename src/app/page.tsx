'use client';

import { useEffect, useState } from 'react';
import { fetchRepos } from './actions/data';
import { generateSummary } from './actions/actions';
import { Repo, TimeRange } from './lib/types';
import RepoCard from './components/repo-card';
import RangeSelect from './components/range-select';

export default function Home() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [range, setRange] = useState<TimeRange>('all-time');

  // Fetch the repositories on load and when the date range changes
  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        const data = await fetchRepos(range);
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
  }, [range]);

  return (
    <div className="container mx-auto min-h-screen p-4 md:p-8 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Trending AI Agent Frameworks
        </h1>
        <RangeSelect range={range} setRange={setRange} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}
