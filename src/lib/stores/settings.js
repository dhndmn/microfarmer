import { readable } from 'svelte/store';

// User preferences

// App settings
export const actions = readable([
    {
        path: '/farm',
        allowedActions: ['read']
    },
    {
        path: '/harvests',
        allowedActions: ['create', 'read', 'update', 'delete']
    },
    {
        path: '/supplies',
        allowedActions: ['create', 'read', 'update', 'delete']
    },
    {
        path: '/journal',
        allowedActions: ['create', 'read', 'update', 'delete']
    },
    {
        path: '/settings',
        allowedActions: ['read']
    }
])