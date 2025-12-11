export type UserRole = 'staff' | 'venue' | 'promoter';

export interface UserProfile {
  id: string;
  role: UserRole;
  name: string;
  avatarUrl?: string;
}

export interface NavigationItem {
  label: string;
  path: string;
  icon: string;
}