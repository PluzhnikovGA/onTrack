// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  HOURS_IN_DAY,
  MIDNIGHT_HOUR,
  SECONDS_IN_HOUR,
  SECONDS_IN_MINUTE,
} from '../../../src/constants/number.constants';
import type { TState } from '../../../src/storage/storage';
import { TActivity } from '../../../src/types/activity.types';
import type { TTimelineItem } from '../../../src/types/timeline.types';
import { today } from '../../../src/utils/time.utils';
import {
  calculateIdleSeconds,
  calculateTrackedActivitySeconds,
  filterTimelineItemsByActivityId,
  generateTimelineItems,
  initializeTimelineItems,
  resetTimelineItemActivities,
  resetTimelineItems,
  scrollToCurrentHour,
  scrollToHour,
  syncIdleSeconds,
  timelineItemRefs,
  timelineItems,
  updateTimelineItem,
} from '../../../src/utils/timeline.utils';

const TRAINING_ACTIVITY_ID = '4rhjfhd7';
const READING_ACTIVITY_ID = 'cvkfjdh54d';
const CURRENT_HOUR = today().getHours();

function createTimelineItem(
  hour: number,
  activityId: string | null = null,
  activitySeconds: number = 0,
  isActive = false,
): TTimelineItem {
  return {
    hour,
    activityId,
    activitySeconds,
    isActive,
  };
}

function createTimelineItems() {
  return [
    createTimelineItem(CURRENT_HOUR - 1, TRAINING_ACTIVITY_ID, SECONDS_IN_HOUR),
    createTimelineItem(CURRENT_HOUR, TRAINING_ACTIVITY_ID, SECONDS_IN_HOUR * 0.5),
    createTimelineItem(CURRENT_HOUR + 1, READING_ACTIVITY_ID, SECONDS_IN_MINUTE * 10, true),
  ];
}

function setupTimelineItems(items?: TTimelineItem[]): void {
  timelineItems.value = items || createTimelineItems();
}

function setupTimelineItemRefs(): void {
  timelineItemRefs.value = Array.from({ length: 24 }, () => ({
    $el: document.createElement('div'),
  }));
}

describe('updateTimelineItem', () => {
  let timelineItem;

  beforeEach(() => {
    timelineItem = createTimelineItem(10, TRAINING_ACTIVITY_ID, SECONDS_IN_MINUTE * 6, true);
  });

  it('should update isActive field', () => {
    updateTimelineItem(timelineItem, { isActive: false });

    expect(timelineItem.isActive).toBe(false);
  });

  it('should update timelineItem to new values', () => {
    const newTimelineItem = createTimelineItem(11, READING_ACTIVITY_ID);

    expect(updateTimelineItem(timelineItem, newTimelineItem)).toEqual(newTimelineItem);
    expect(timelineItem).toEqual(newTimelineItem);
  });
});

describe('resetTimelineItemActivities', () => {
  it('should reset activityId and activitySeconds for matching items', () => {
    setupTimelineItems();

    resetTimelineItemActivities(TRAINING_ACTIVITY_ID);

    expect(timelineItems.value[0]).toMatchObject({ activityId: null, activitySeconds: 0 });
    expect(timelineItems.value[1]).toMatchObject({ activityId: null, activitySeconds: 1800 });
    expect(timelineItems.value[2]).toMatchObject({
      activityId: READING_ACTIVITY_ID,
      activitySeconds: 600,
    });
  });
});

describe('scroll functions', () => {
  beforeEach(() => setupTimelineItemRefs());

  describe('scrollToHour', () => {
    it('should scroll to body when hour is midnight (0)', () => {
      const bodyMock = vi.spyOn(document.body, 'scrollIntoView');

      scrollToHour(MIDNIGHT_HOUR);

      expect(bodyMock).toHaveBeenCalledWith({ behavior: 'smooth' });
    });

    it('should scroll to the correct hour element', () => {
      const hour = 10;
      const scrollIntoTenOClock = vi.spyOn(timelineItemRefs.value[hour - 1].$el, 'scrollIntoView');

      scrollToHour(hour, false);

      expect(scrollIntoTenOClock).toHaveBeenCalledWith({ behavior: 'instant' });
    });
  });

  describe('scrollToCurrentHour', () => {
    const mockHour = new Date(2024, 0, 1, 16, 0, 0);
    const currentHour = mockHour.getHours();

    function scrollToCurrentHourTest(expectedBehavior: string, isSmooth?: boolean): void {
      vi.useFakeTimers().setSystemTime(mockHour);
      const scrollIntoCurrentOClock = vi.spyOn(
        timelineItemRefs.value[currentHour - 1].$el,
        'scrollIntoView',
      );

      scrollToCurrentHour(isSmooth);

      expect(scrollIntoCurrentOClock).toHaveBeenCalledWith({ behavior: expectedBehavior });
      vi.useRealTimers();
    }

    it('should call scrollToHour with the current hour and isSmooth = true', () => {
      scrollToCurrentHourTest('smooth', true);
    });

    it('should call scrollToHour with the current hour and isSmooth = false', () => {
      scrollToCurrentHourTest('instant', false);
    });

    it('should call scrollToHour with the current hour and default isSmooth', () => {
      scrollToCurrentHourTest('instant');
    });
  });
});

describe('calculateTrackedActivitySeconds', () => {
  beforeEach(() => setupTimelineItems());

  it.each([
    [5400, TRAINING_ACTIVITY_ID],
    [600, READING_ACTIVITY_ID],
    [0, 'nonExistingId'],
  ])('should return %d for activityId %s', (expected, activityId) => {
    expect(calculateTrackedActivitySeconds(activityId)).toBe(expected);
  });
});

describe('syncIdleSeconds', () => {
  it('should calculate and sync idle seconds correctly', () => {
    const lastActiveAt = new Date(2024, 0, 1, 14, 30);
    timelineItems.value = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      activityId: null,
      activitySeconds: hour === 14 ? SECONDS_IN_MINUTE * 30 : 0,
      isActive: hour === 14 ? true : false,
    }));
    const timeReload = new Date(2024, 0, 1, 14, 40);
    vi.useFakeTimers().setSystemTime(timeReload);

    syncIdleSeconds(lastActiveAt);

    expect(timelineItems.value[14]).toMatchObject({ activitySeconds: 2400 });
    expect(timelineItems.value[15]).toMatchObject({ activitySeconds: 0 });
    vi.useRealTimers();
  });
});

describe('calculateIdleSeconds', () => {
  const lastActiveAt = new Date(2024, 0, 1, 14, 30);
  const testCases = [
    { mockTime: new Date(2024, 0, 1, 14, 35), expected: 300 },
    { mockTime: new Date(2024, 0, 1, 15, 35), expected: 1800 },
  ];

  it.each(testCases)(
    `should return $expected seconds when lastActiveAt was at ${lastActiveAt.toISOString()}, and after opened app in $mockTime`,
    ({ mockTime, expected }) => {
      vi.useFakeTimers().setSystemTime(mockTime);
      expect(calculateIdleSeconds(lastActiveAt)).toBe(expected);
      vi.useRealTimers();
    },
  );
});

describe('resetTimelineItems', () => {
  it('should reset activitySeconds and isActive for all timelineItems', () => {
    setupTimelineItems(
      Array.from({ length: 24 }, (_, hour) => ({
        hour,
        activityId: hour === 14 || hour === 16 || hour === 22 ? TRAINING_ACTIVITY_ID : null,
        activitySeconds:
          hour === 14 || hour === 16 ? SECONDS_IN_HOUR : hour === 22 ? SECONDS_IN_HOUR * 0.5 : 0,
        isActive: hour === 22,
      })),
    );
    const expectedTimelineItems = timelineItems.value.map((item) => ({
      ...item,
      activitySeconds: 0,
      isActive: false,
    }));

    resetTimelineItems();

    expect(timelineItems.value).toEqual(expectedTimelineItems);
  });
});

describe('generateTimelineItems', () => {
  it('should return an array of TTimelineItem objects with correct properties', () => {
    const result = generateTimelineItems();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(HOURS_IN_DAY);
    result.forEach((item, index) => {
      expect(item).toMatchObject({
        hour: index,
        activityId: null,
        activitySeconds: 0,
        isActive: false,
      });
    });
  });
});

describe('filterTimelineItemsByActivityId', () => {
  beforeEach(() => setupTimelineItems());

  it.each([
    [
      TRAINING_ACTIVITY_ID,
      [
        createTimelineItem(CURRENT_HOUR - 1, TRAINING_ACTIVITY_ID, SECONDS_IN_HOUR),
        createTimelineItem(CURRENT_HOUR, TRAINING_ACTIVITY_ID, SECONDS_IN_HOUR * 0.5),
      ],
    ],
    [
      READING_ACTIVITY_ID,
      [createTimelineItem(CURRENT_HOUR + 1, READING_ACTIVITY_ID, SECONDS_IN_MINUTE * 10, true)],
    ],
    ['nonExistentId', []],
  ])('should return timeline items with activityId %s', (activityId, expected) => {
    expect(filterTimelineItemsByActivityId(activityId)).toEqual(expected);
  });
});

describe('initializeTimelineItems', () => {
  function setupMockState(
    lastActiveAt: Date,
    timelineItems: TTimelineItem[],
    activities: TActivity[],
  ): TState {
    return { lastActiveAt, timelineItems, activities };
  }

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should update activitySeconds for current time', () => {
    const mockState: TState = setupMockState(
      new Date(2024, 0, 1, 14, 30),
      Array.from({ length: 24 }, (_, hour) => ({
        hour,
        activityId: TRAINING_ACTIVITY_ID,
        activitySeconds: hour === 14 ? SECONDS_IN_MINUTE * 30 : 0,
        isActive: hour === 14,
      })),
      [
        {
          id: TRAINING_ACTIVITY_ID,
          name: 'Training',
          secondsToComplete: SECONDS_IN_HOUR,
        },
      ],
    );

    const mokeDate = new Date(2024, 0, 1, 14, 40);
    vi.useFakeTimers().setSystemTime(mokeDate);

    initializeTimelineItems(mockState);

    expect(timelineItems.value[14]).toMatchObject({ activitySeconds: 2400, isActive: true });
  });

  it('should reset all activitySeconds and isActive and create new timelineItems', () => {
    const mockState: TState = setupMockState(
      new Date(2024, 0, 1, 14, 30),
      Array.from({ length: 24 }, (_, hour) => ({
        hour,
        activityId: TRAINING_ACTIVITY_ID,
        activitySeconds:
          hour === 14 || hour === 16 || hour === 18
            ? SECONDS_IN_HOUR
            : hour === 20
              ? SECONDS_IN_HOUR * 0.5
              : 0,
        isActive: hour === 20,
      })),
      [
        {
          id: TRAINING_ACTIVITY_ID,
          name: 'Training',
          secondsToComplete: SECONDS_IN_HOUR,
        },
      ],
    );

    const mokeDate = new Date(2024, 0, 2, 14, 40);
    vi.useFakeTimers().setSystemTime(mokeDate);

    initializeTimelineItems(mockState);

    timelineItems.value.forEach((timelineItem) => {
      expect(timelineItem).toMatchObject({ activitySeconds: 0, isActive: false });
    });
  });

  it('should create new timelineItems', () => {
    const mokeDate = new Date(2024, 0, 2, 14, 40);
    vi.useFakeTimers().setSystemTime(mokeDate);

    initializeTimelineItems({});

    timelineItems.value.forEach((timelineItem, index) => {
      expect(timelineItem).toMatchObject({
        hour: index,
        activityId: null,
        activitySeconds: 0,
        isActive: false,
      });
    });
  });
});
