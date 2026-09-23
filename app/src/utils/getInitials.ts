export function getInitials(firstName: string | undefined, lastName: string | undefined): string {
    return `${(firstName || "").charAt(0)}${(lastName || "").charAt(0)}`.toUpperCase();
};