export const UserRole = {
    Admin: 'Admin',
    User: 'User',
    Moderator: 'Moderator',
    Guest: 'Guest',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];