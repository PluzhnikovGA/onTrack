import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SECONDS_IN_HOUR, SECONDS_IN_MINUTE } from '../../../src/constants/number.constants';
import { TState } from '../../../src/storage/storage';
import type { TActivity } from '../../../src/types/activity.types';
import { TTimelineItem } from '../../../src/types/timeline.types';
import {
  activities,
  activitySelectOptions,
  createActivity,
  deleteActivity,
  generateActivitySelectOptions,
  id,
  initializeActivities,
  trackedActivities,
  updateActivity,
} from '../../../src/utils/activity.utils';

const TRAINING_ACTIVITY_ID = '4rhjfhd7';
const READING_ACTIVITY_ID = 'cvkfjdh54d';
const CODING_ACTIVITY_ID = 'cvkfwlh54d';

function setupMockState(
  lastActiveAt: Date,
  timelineItems: TTimelineItem[],
  activities: TActivity[],
): TState {
  return { lastActiveAt, timelineItems, activities };
}

function createActivityData(id: string, name: string, secondsToComplete: number): TActivity {
  return {
    id,
    name,
    secondsToComplete,
  };
}

beforeEach(() => {
  activities.value = [
    createActivityData(TRAINING_ACTIVITY_ID, 'Training', SECONDS_IN_HOUR * 2),
    createActivityData(READING_ACTIVITY_ID, 'Reading', SECONDS_IN_HOUR * 4),
    createActivityData(CODING_ACTIVITY_ID, 'Coding', 0),
  ];
});

describe('trackedActivities', () => {
  it('should return activities with secondsToComplete more than 0', () => {
    const expectedActivities = activities.value.filter(
      (activity: TActivity) => activity.secondsToComplete > 0,
    );

    expect(trackedActivities.value.length).toBe(expectedActivities.length);
    expectedActivities.forEach((activity) => {
      expect(trackedActivities.value).toContainEqual(activity);
    });
  });
});

describe('activitySelectOptions', () => {
  it('should return select options with all activities', () => {
    expect(activitySelectOptions.value.length).toBe(activities.value.length);
  });

  it('should return empty select options when activities is empty', () => {
    activities.value = [];

    expect(activitySelectOptions.value.length).toBe(0);
  });
});

describe('createActivity', () => {
  it('should add new activity in activities', () => {
    const countActivities = activities.value.length;

    createActivity('Diving');

    expect(activities.value.length).toBe(countActivities + 1);
    expect(activities.value).toContainEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Diving',
        secondsToComplete: 0,
      }),
    );
  });

  it('should not add duplicate activities with the same name', () => {
    const countActivities = activities.value.length;

    createActivity('Training');

    expect(activities.value.length).toBe(countActivities);
  });
});

describe('updateActivity', () => {
  const newActivity: Partial<TActivity> = {
    id: READING_ACTIVITY_ID,
    name: 'Updated Reading',
    secondsToComplete: SECONDS_IN_MINUTE * 6,
  };
  let activity: TActivity;

  beforeEach(() => {
    activity = { ...createActivityData(TRAINING_ACTIVITY_ID, 'Training', SECONDS_IN_MINUTE * 5) };
  });

  it('should update the original activity', () => {
    updateActivity(activity, newActivity);

    expect(activity).toEqual({ ...activity, ...newActivity });
  });

  it('should return the updated activity', () => {
    const updatedActivity = updateActivity(activity, newActivity);

    expect(updatedActivity).toEqual({ ...activity, ...newActivity });
  });

  it('should not update if an empty object is passed', () => {
    const originalActivity = { ...activity };

    updateActivity(activity, {});

    expect(activity).toEqual(originalActivity);
  });

  it('should handle partial updates correctly', () => {
    const updatedFields: Partial<TActivity> = { name: 'Partially Updated Activity' };

    updateActivity(activity, updatedFields);

    expect(activity.name).toBe('Partially Updated Activity');
    expect(activity.secondsToComplete).toBe(300);
    expect(activity.id).toBe(TRAINING_ACTIVITY_ID);
  });
});

describe('deleteActivity', () => {
  const testCases = [
    { activityId: TRAINING_ACTIVITY_ID, length: 2 },
    { activityId: READING_ACTIVITY_ID, length: 2 },
    { activityId: 'nonExistentId', length: 3 },
  ];

  it.each(testCases)(
    'should remove the activity with $activityId from activities',
    ({ activityId, length }) => {
      deleteActivity(activityId);

      expect(activities.value.length).toBe(length);
    },
  );
});

describe('initializeActivities', () => {
  it('should set activities from state', () => {
    const mockState: TState = setupMockState(
      new Date(2024, 0, 1, 14, 30),
      [],
      [
        createActivityData(TRAINING_ACTIVITY_ID, 'Training', SECONDS_IN_HOUR * 2),
        createActivityData(READING_ACTIVITY_ID, 'Reading', SECONDS_IN_HOUR * 4),
      ],
    );

    initializeActivities(mockState);

    expect(activities.value.length).toBe(2);
  });

  it('should reset activities when state is empty', () => {
    initializeActivities({ activities: [] });

    expect(activities.value.length).toBe(0);
  });
});

describe('id', () => {
  it('should return corrected id value', () => {
    const nowSpy = vi.spyOn(Date, 'now').mockReturnValueOnce(30);
    const randomSpy = vi.spyOn(Math, 'random').mockReturnValueOnce(10000);

    expect(id()).toEqual('us');
    expect(nowSpy).toHaveBeenCalled();
    expect(randomSpy).toHaveBeenCalled();
  });
});

describe('generateActivitySelectOptions', () => {
  it('activity select options should have all activities', () => {
    const activitySelectOptions = generateActivitySelectOptions(activities);

    expect(activitySelectOptions.length).toBe(3);
    activitySelectOptions.forEach((_, index) => {
      expect(activitySelectOptions).toContainEqual({
        value: activities.value[index].id,
        label: activities.value[index].name,
      });
    });
  });
});
