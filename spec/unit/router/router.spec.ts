// @vitest-environment happy-dom
import { describe, expect, it, vi } from 'vitest';

import { currentPage, navigate, normalizePageHash } from '../../../src/router/router';
import { PageName } from '../../../src/types/navigation.types';

describe('navigate', () => {
  const scrollIntoViewSpy = vi.spyOn(document.body, 'scrollIntoView');

  const testCases = [
    { page: PageName.TIMELINE },
    { page: PageName.ACTIVITIES },
    { page: PageName.PROGRESS },
  ];

  it.each(testCases)('should go to page $page', ({ page }) => {
    navigate(page);
    expect(currentPage.value).toBe(page);
    expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'instant' });
  });
});
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
