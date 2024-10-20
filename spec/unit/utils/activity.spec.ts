import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SECONDS_IN_MINUTE } from '../../../src/constants/number.constants';
import type { TActivity } from '../../../src/types/activity.types';
import { id, updateActivity } from '../../../src/utils/activity.utils';

it.todo('trackedActivities');

it.todo('activitySelectOptions');

it.todo('createActivity');

describe('updateActivity', () => {
  const newActivity: Partial<TActivity> = {
    id: 'dfvhdg77hsdfvh',
    name: 'Activity 2',
    secondsToComplete: SECONDS_IN_MINUTE * 6,
  };
  let activity: TActivity;

  beforeEach(() => {
    activity = {
      id: 'djfg4jhfe',
      name: 'Activity 1',
      secondsToComplete: SECONDS_IN_MINUTE * 5,
    };
  });

  it('should update the original activity', () => {
    updateActivity(activity, newActivity);

    expect(activity).toEqual(newActivity);
  });

  it('should return the updated activity', () => {
    expect(updateActivity(activity, newActivity)).toEqual(newActivity);
  });

  it('should not update if empty object is passed', () => {
    const originalActivity = { ...activity };

    updateActivity(activity, {});

    expect(activity).toEqual(originalActivity);
  });

  it('should handle partial updates correctly', () => {
    const updatedFields: Partial<TActivity> = { name: 'Updated Activity' };

    updateActivity(activity, updatedFields);

    expect(activity.name).toBe('Updated Activity');
    expect(activity.secondsToComplete).toBe(300);
    expect(activity.id).toBe('djfg4jhfe');
  });
});

it.todo('deleteActivity');

it.todo('initializeActivities');

describe('id', () => {
  it('should return corrected id value', () => {
    vi.spyOn(Date, 'now').mockReturnValueOnce(30);
    vi.spyOn(Math, 'random').mockReturnValueOnce(10000);

    expect(id()).toEqual('us');
  });
});

it.todo('generateActivitySelectOptions');
