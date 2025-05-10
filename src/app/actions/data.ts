'use server';

export async function fetchRepos() {
  const query = encodeURIComponent('ai agent framework sort:stars');
  const url = `https://api.github.com/search/repositories?q=${query}&per_page=10`;
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
    return data.items;
  } catch (error) {
    console.error('Error fetching repositories:', error);
  }
}