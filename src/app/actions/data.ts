'use server';

import { Repo } from '../lib/types';

export async function fetchRepos() {
  const query = encodeURIComponent('ai agent framework sort:stars');
  const url = `https://api.github.com/search/repositories?q=${query}&per_page=12`;
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }

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
      owner: item.owner.login,
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