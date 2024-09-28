import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Create a __dirname equivalent
export const __dirname = dirname(fileURLToPath(import.meta.url));
