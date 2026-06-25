import type { AsciiArt } from './types';
import { portrait01 } from './arts/portrait-01';
import { ascii02 } from './arts/ascii-02';
import { ascii03 } from './arts/ascii-03';
import { ascii04 } from './arts/ascii-04';
import { ascii05 } from './arts/ascii-05';

/**
 * Drop new ASCII files in `arts/` and add them here.
 * On each refresh, pieces are shuffled into random slots across the page.
 */
export const asciiArts: AsciiArt[] = [portrait01, ascii02, ascii03, ascii04, ascii05];
