export function recentWorkspaces() {
  return localStorage.getItem('recentWorkspaces') || '';
}

export function recentShared() {
  return localStorage.getItem('recentShared') || ''
}

export function addWorkspace(id) {
  const ar = recentWorkspaces()
    .split(',')
    .filter((s) => s);
  if (!ar.includes(id)) {
    ar.push(id);
    localStorage.setItem('recentWorkspaces', ar.join(','));
  }
}

export function addShared(id) {
  const ar = recentShared().split(',').filter((s) => s)
  if (!ar.includes(id)) {
    ar.push(id)
    localStorage.setItem('recentShared', ar.join(','))
  }
}

export function removeShared(id) {
  const ar = recentShared().split(',').filter((s) => s !== id)
  localStorage.setItem('recentShared', ar.join(','))
}
