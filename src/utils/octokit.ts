import { Octokit } from "@octokit/rest";

export const octokit = new Octokit({
  auth: import.meta.env.REACT_APP_GITHUB_CLIENT_SECRET,
  userAgent: "skylight v1",
});
