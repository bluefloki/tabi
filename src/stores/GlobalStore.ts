import { writable } from 'svelte/store';

export const activePage = writable('');

export const openDrawer = writable(false);
export const drawerAction = writable<'ADD' | 'UPDATE' | undefined>(undefined);
export const selectedColor = writable('');

export const openDropdown = writable(false);
