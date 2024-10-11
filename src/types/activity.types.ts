export type TActivity = {
  id: string;
  name: string;
  secondsToComplete: number;
};

export type TSetSecondsToCompleted = (seconds: string | number | null, activity: TActivity) => void;

export type TCreateActivity = (newActivity: string) => void;

export type TDeleteActivity = (activityId: string) => void;
