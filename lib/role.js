// lib/roles.js
// Map Clerk user metadata to app roles
export function mapClerkRoleToAppRole(clerkUser) {
  const publicMetadata = clerkUser?.publicMetadata;
  
  if (publicMetadata?.role) {
    switch (publicMetadata.role.toLowerCase()) {
      case 'admin':
        return 'admin';
      case 'team-leader':
      case 'team_leader':
        return 'team-leader';
      case 'support-worker':
      case 'support_worker':
      default:
        return 'support-worker';
    }
  }

  // Default role for users without metadata
  return 'support-worker';
}