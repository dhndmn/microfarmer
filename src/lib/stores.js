import { localStorageStore } from '@skeletonlabs/skeleton';
export const prefix = 'mf';

// Farm stores
export const established = localStorageStore(`${prefix}-established`, '');
export const farmerId = localStorageStore(`${prefix}-farmer-id`, '');
export const farmerName = localStorageStore(`${prefix}-farmer-name`, '');
export const farmName = localStorageStore(`${prefix}-farm-name`, '');

// Harvest stores
export const harvests = localStorageStore(`${prefix}-harvests`, []);
export const traySizes = localStorageStore(`${prefix}-tray-sizes`, ['1020', '520', 'mini']);

// Supplies stores
export const supplies = localStorageStore(`${prefix}-supplies`, []);
export const supplyTypes = localStorageStore(`${prefix}-supplies`, ['seeds', 'soil', 'trays']);
