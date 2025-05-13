'use server';

import { Repo, TimeRange } from '../lib/types';
import { subYears, subMonths, format } from 'date-fns';

export async function fetchRepos(range: TimeRange) {
  const query = encodeURIComponent(
    `ai agent framework ${startDate(range)}sort:stars`
  );
  const url = `https://api.github.com/search/repositories?q=${query}&per_page=12`;
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error('GitHub API request failed');
    }
    const data = await response.json();
    const repos = data.items.map((item: Repo) => ({
      id: item.id,
      name: item.name,
      full_name: item.full_name,
      owner: item.owner,
      description: item.description,
      html_url: item.html_url,
      stargazers_count: item.stargazers_count,
      language: item.language,
      topics: item.topics,
      created_at: item.created_at,
      updated_at: item.updated_at,
      forks_count: item.forks_count,
      open_issues_count: item.open_issues_count,
    }));

    return repos;
  } catch (error) {
    console.error('Error fetching repositories:', error);
  }
}

const startDate = (range: TimeRange) => {
  const today = new Date();
  let date: Date;

  switch (range) {
    case 'year':
      date = subYears(today, 1);
      break;
    case 'month':
      date = subMonths(today, 1);
      break;
    default:
      return '';
  }

  return `created:>${format(date, 'yyyy-MM-dd')} `;
};
