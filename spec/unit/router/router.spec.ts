// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest';

import { normalizePageHash } from '../../../src/router/router';
import { PageName } from '../../../src/types/navigation.types';

it.todo('navigate');
describe('normalizePageHash', () => {
  it('normalize valid page hash', () => {
    Object.values(PageName).forEach((page: PageName): void => {
      window.location.hash = `#${page}`;

      expect(normalizePageHash()).toBe(page);
      expect(window.location.hash).toBe(`#${page}`);
    });
  });
  it('normalize invalid page hash', () => {
    window.location.hash = '#invalid';

    expect(normalizePageHash()).toBe(PageName.TIMELINE);
    expect(window.location.hash).toBe(`#${PageName.TIMELINE}`);
  });
});
