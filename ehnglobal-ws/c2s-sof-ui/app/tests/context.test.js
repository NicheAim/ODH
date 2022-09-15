/**
 * Test context.js
 */

import 'mock-local-storage';
import { history, store } from '../context';

describe('context', () => {
  it('should export history object', () => {
    expect(history).not.toBeNull();
    expect(typeof history).toBe('object');
  });

  it('should export store object', () => {
    expect(store).not.toBeNull();
    expect(typeof store).toBe('object');
  });
});
