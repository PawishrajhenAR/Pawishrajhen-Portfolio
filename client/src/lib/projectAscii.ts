/** Pick one project card per page load for the projects-only ASCII accent. */
export function pickRandomProjectIndex(projectCount: number): number {
  if (projectCount <= 0) return -1;
  return Math.floor(Math.random() * projectCount);
}
