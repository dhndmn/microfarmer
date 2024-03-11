import { localStorageStore } from '@skeletonlabs/skeleton';
const prefix = 'mf';

// Farm stores
export const established = localStorageStore(`${prefix}-established`, '');
export const farmerId = localStorageStore(`${prefix}-farmer-id`, '');
export const farmerName = localStorageStore(`${prefix}-farmer-name`, '');
export const farmName = localStorageStore(`${prefix}-farm-name`, '');

// Supplies stores
export const selectedSupply = localStorageStore(`${prefix}-selected-supply`, {});
export const supplies = localStorageStore(`${prefix}-supplies`, []);
