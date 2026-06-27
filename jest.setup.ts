import { TextDecoder, TextEncoder } from 'node:util';

import '@testing-library/jest-dom';

if (typeof globalThis.TextEncoder === 'undefined') {
  globalThis.TextEncoder = TextEncoder;
  globalThis.TextDecoder = TextDecoder as typeof globalThis.TextDecoder;
}
