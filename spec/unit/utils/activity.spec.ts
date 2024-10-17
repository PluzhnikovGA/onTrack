import { describe, expect, it, vi } from 'vitest';

import { id, updateActivity } from '@/utils/activity.utils';

import type { TActivity } from '@/types/activity.types';

it.todo('trackedActivities');

it.todo('activitySelectOptions');

it.todo('createActivity');

describe('updateActivity', () => {
  it('should return only activity with change secondsToComplete field', () => {
    const activity: TActivity = {
      id: 'djfg4jhfe',
      name: 'Activity 1',
      secondsToComplete: 35,
    };
    const updatedField: Partial<TActivity> = { secondsToComplete: 40 };

    updateActivity(activity, updatedField);

    expect(activity.id).toBe('djfg4jhfe');
    expect(activity.name).toBe('Activity 1');
    expect(activity.secondsToComplete).toBe(40);
  });

  it('should return full change activity', () => {
    const activity: TActivity = {
      id: 'djfg4jhfe',
      name: 'Activity 1',
      secondsToComplete: 35,
    };
    const newActivity: Partial<TActivity> = {
      id: 'dfvhdg77hsdfvh',
      name: 'Activity 2',
      secondsToComplete: 40,
    };

    expect(updateActivity(activity, newActivity)).toEqual(newActivity);
    expect(activity).toEqual(newActivity);
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
