import React from 'react';

import { BookmarkPlus, User, FileText, ClipboardList, Ticket, Folder, Briefcase, FileCheck, DollarSign, Calendar, MapPin, MessageCircle, LogOut, File } from 'lucide-react';

// Type definition for drawer data
export type DrawerData = {
    id: number;
    name: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Specify type for icon
    link: string;
    adminOnly: boolean;
}

// Function to handle logout action

// Drawer data with roles and permissions
export const drawerData: DrawerData[] = [
    { id: 0, name: 'My Cases', icon: Briefcase, link: 'mycases', adminOnly: false },
    { id: 1, name: 'Appointments', icon: ClipboardList, link: 'client-appointments', adminOnly: false },
    { id: 2, name: 'Documents', icon: FileText, link: 'documents', adminOnly: false },
    { id: 3, name: 'Manage users', icon: User, link: 'account', adminOnly: true },
    { id: 4, name: 'Manage Cases', icon: BookmarkPlus, link: 'cases', adminOnly: true },
    { id: 5, name: 'Support Tickets', icon: Ticket, link: 'supporttickets', adminOnly: true },
    { id: 6, name: 'Payments', icon: DollarSign, link: 'invoices-payments', adminOnly: false },
    { id: 7, name: 'Reports', icon: Folder, link: 'reports', adminOnly: true },
    { id: 8, name: 'Profile', icon: User, link: 'profile', adminOnly: false },
    { id: 9, name: 'Settings', icon: FileCheck, link: 'settings', adminOnly: true },
    { id: 10, name: 'Events', icon: Calendar, link: 'events', adminOnly: false },
    { id: 11, name: 'Event Reminders', icon: Calendar, link: 'event-reminders', adminOnly: false },
    { id: 12, name: 'Location', icon: MapPin, link: 'location', adminOnly: false },
    { id: 13, name: 'Feedbacks', icon: MessageCircle, link: 'feedbacks', adminOnly: false },
    { id: 14, name: 'Logs', icon: File, link: 'logs', adminOnly: true },
    
    { id: 16, name: 'My Tickets', icon: Ticket, link: 'mytickets', adminOnly: false },
    { id: 15, name: 'Logout', icon: LogOut, link: 'logout', adminOnly: false },
];

// Role-based access control (RBAC) function
export const filterDrawerByRole = (role: string): DrawerData[] => {
    const adminRoles = ['admin', 'support', 'manager'];
    const lawyerRoles = ['lawyer'];
    const userRoles = ['user', 'client'];

    return drawerData.filter(item => {
        if (item.link === 'logout') return true; // Logout is accessible to all roles
        if (adminRoles.includes(role)) return true; // Admin, support, and manager have full access
        if (lawyerRoles.includes(role)) return !item.adminOnly; // Lawyers have access to non-admin only items
        if (userRoles.includes(role)) return !item.adminOnly && item.name !== 'Manage Cases' && item.name !== 'Manage Clients'; // Users and clients have limited access
        return false; // Default to no access if role does not match any categories
    });
};






