// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SECONDS_IN_HOUR, SECONDS_IN_MINUTE } from '../../../src/constants/number.constants';
import { APP_NAME } from '../../../src/constants/page.constants';
import {
  TState,
  loadFromLocalStorage,
  loadState,
  saveState,
  syncState,
} from '../../../src/storage/storage';
import { TActivity } from '../../../src/types/activity.types';
import { TTimelineItem } from '../../../src/types/timeline.types';
import { activities } from '../../../src/utils/activity.utils';
import { today } from '../../../src/utils/time.utils';
import { timelineItems } from '../../../src/utils/timeline.utils';
import { timelineItemTimer } from '../../../src/utils/timer.utils';

const TRAINING_ACTIVITY_ID = '4rhjfhd7';

function setupMockState(
  lastActiveAt: Date,
  timelineItems: TTimelineItem[],
  activities: TActivity[],
): TState {
  return { lastActiveAt, timelineItems, activities };
}

beforeEach(() => {
  activities.value = [];
  timelineItems.value = [];
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('syncState', () => {
  it('should call loadState when shouldLoad is true', () => {
    const loadStateSpy = vi.spyOn(window.localStorage, 'getItem');
    syncState(true);
    expect(loadStateSpy).toHaveBeenCalled();
  });

  it('should call saveState when shouldLoad is false', () => {
    const saveStateSpy = vi.spyOn(window.localStorage, 'setItem');
    syncState(false);
    expect(saveStateSpy).toHaveBeenCalled();
  });

  it('should start timer if activeTimelineItem exists and shouldLoad is true', () => {
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
    vi.useFakeTimers().setSystemTime(new Date(2024, 0, 1, 14));
    vi.spyOn(window.localStorage, 'getItem').mockReturnValue(JSON.stringify(mockState));

    syncState(true);

    expect(timelineItems.value[14].isActive).toBe(true);
    vi.useRealTimers();
  });

  it('should stop timer if activeTimelineItem exists and shouldLoad is false', () => {
    timelineItems.value = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      activityId: TRAINING_ACTIVITY_ID,
      activitySeconds:
        hour === 14 || hour === 16 || hour === 18
          ? SECONDS_IN_HOUR
          : hour === 20
            ? SECONDS_IN_HOUR * 0.5
            : 0,
      isActive: hour === 20,
    }));
    activities.value = [
      {
        id: TRAINING_ACTIVITY_ID,
        name: 'Training',
        secondsToComplete: SECONDS_IN_HOUR,
      },
    ];

    vi.useFakeTimers().setSystemTime(new Date(2024, 0, 1, 14));
    vi.spyOn(window.localStorage, 'setItem');
    syncState(false);

    expect(timelineItemTimer.value).toBe(null);
    vi.useRealTimers();
  });
});

describe('saveState', () => {
  it('should save the correct state to localStorage', () => {
    timelineItems.value = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      activityId: TRAINING_ACTIVITY_ID,
      activitySeconds:
        hour === 14 || hour === 16 || hour === 18
          ? SECONDS_IN_HOUR
          : hour === 20
            ? SECONDS_IN_HOUR * 0.5
            : 0,
      isActive: hour === 20,
    }));
    activities.value = [
      {
        id: TRAINING_ACTIVITY_ID,
        name: 'Training',
        secondsToComplete: SECONDS_IN_HOUR,
      },
    ];
    const expectedState = {
      timelineItems: timelineItems.value,
      activities: activities.value,
      lastActiveAt: today(),
    };
    const setItemSpy = vi.spyOn(window.localStorage, 'setItem');

    saveState();

    expect(setItemSpy).toHaveBeenCalledWith(APP_NAME, JSON.stringify(expectedState));
  });
});

describe('loadState', () => {
  it('should initialize activities and timeline items from localStorage', () => {
    const mockState = setupMockState(
      new Date(),
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

    vi.spyOn(window.localStorage, 'getItem').mockReturnValue(JSON.stringify(mockState));

    loadState();

    expect(activities.value).toEqual(mockState.activities);
    expect(timelineItems.value).toEqual(mockState.timelineItems);
  });
});

describe('loadFromLocalStorage', () => {
  it('should return parsed state from localStorage', () => {
    const mockState = { timelineItems: [], activities: [] };
    vi.spyOn(window.localStorage, 'getItem').mockReturnValue(JSON.stringify(mockState));

    expect(loadFromLocalStorage()).toEqual(mockState);
  });

  it('should return an empty object if localStorage is empty', () => {
    vi.spyOn(window.localStorage, 'getItem').mockReturnValue(null);

    expect(loadFromLocalStorage()).toEqual({});
  });
});
