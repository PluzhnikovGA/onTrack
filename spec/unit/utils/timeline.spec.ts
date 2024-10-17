import { beforeEach, describe, expect, it } from 'vitest';

import { today } from '@/utils/time.utils';
import {
  filterTimelineItemsByActivityId,
  resetTimelineItemActivities,
  timelineItems,
  updateTimelineItem,
} from '@/utils/timeline.utils';

import { TTimelineItem } from '@/types/timeline.types';

describe('updateTimelineItem', () => {
  it('should return only timelineItem with change isActive field', () => {
    const timelineItem: TTimelineItem = {
      hour: 10,
      activityId: 'hfudhf32jj3',
      activitySeconds: 360,
      isActive: true,
    };
    const updatedField: Partial<TTimelineItem> = { isActive: false };

    updateTimelineItem(timelineItem, updatedField);

    expect(timelineItem.hour).toBe(10);
    expect(timelineItem.activityId).toBe('hfudhf32jj3');
    expect(timelineItem.activitySeconds).toBe(360);
    expect(timelineItem.isActive).toBe(false);
  });

  it('should return full change timelineItem', () => {
    const timelineItem: TTimelineItem = {
      hour: 10,
      activityId: 'hfudhf32jj3',
      activitySeconds: 360,
      isActive: true,
    };
    const newTimelineItem: TTimelineItem = {
      hour: 11,
      activityId: 'cffbfty6c',
      activitySeconds: 0,
      isActive: false,
    };

    expect(updateTimelineItem(timelineItem, newTimelineItem)).toEqual(newTimelineItem);
    expect(timelineItem).toEqual(newTimelineItem);
  });
});

describe('resetTimelineItemActivities', () => {
  it('should reset activityId and activitySeconds for the items with matching trainingActivityId', () => {
    const trainingActivityId = '4rhjfhd7';
    const readingActivityId = 'cvkfjdh54d';
    const currentHour = today().getHours();

    timelineItems.value = [
      {
        hour: currentHour - 1,
        activityId: trainingActivityId,
        activitySeconds: 1800,
        isActive: false,
      },
      {
        hour: currentHour,
        activityId: trainingActivityId,
        activitySeconds: 360,
        isActive: false,
      },
      {
        hour: currentHour + 1,
        activityId: readingActivityId,
        activitySeconds: 30,
        isActive: true,
      },
    ];

    resetTimelineItemActivities(trainingActivityId);

    expect(timelineItems.value[0].activityId).toBeNull();
    expect(timelineItems.value[0].activitySeconds).toBe(0);
    expect(timelineItems.value[1].activityId).toBeNull();
    expect(timelineItems.value[1].activitySeconds).toBe(360);
    expect(timelineItems.value[2].activityId).toBe(readingActivityId);
    expect(timelineItems.value[2].activitySeconds).toBe(30);
  });
});

it.todo('scrollToHour');

it.todo('scrollToCurrentHour');

it.todo('calculateTrackedActivitySeconds');

it.todo('initializeTimelineItems');

it.todo('generateTimelineItems');

describe('filterTimelineItemsByActivityId', () => {
  const trainingActivityId = '4rhjfhd7';
  const readingActivityId = 'cvkfjdh54d';

  beforeEach(() => {
    timelineItems.value = [
      {
        hour: 1,
        activityId: trainingActivityId,
        activitySeconds: 1800,
        isActive: false,
      },
      {
        hour: 2,
        activityId: trainingActivityId,
        activitySeconds: 360,
        isActive: false,
      },
      {
        hour: 3,
        activityId: readingActivityId,
        activitySeconds: 30,
        isActive: true,
      },
    ];
  });

  it('should return timeline items with the specified activityId', () => {
    const result = filterTimelineItemsByActivityId(trainingActivityId);

    const expected = [
      {
        hour: 1,
        activityId: trainingActivityId,
        activitySeconds: 1800,
        isActive: false,
      },
      {
        hour: 2,
        activityId: trainingActivityId,
        activitySeconds: 360,
        isActive: false,
      },
    ];

    expect(result).toEqual(expected);
  });

  it('should return an empty array if no timeline items match the activityId', () => {
    const result = filterTimelineItemsByActivityId('nonexistentId');

    expect(result).toEqual([]);
  });
});

it.todo('syncIdleSeconds');

it.todo('calculateIdleSeconds');

it.todo('resetTimelineItems');
