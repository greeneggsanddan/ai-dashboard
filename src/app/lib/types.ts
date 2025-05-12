export interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string;
  owner: Owner;
  topics: string[];
  created_at: string;
  updated_at: string;
  forks_count: number;
  open_issues_count: number;
}

export interface Owner {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}