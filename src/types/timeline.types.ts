export type TTimelineItem = {
  hour: number;
  activityId: string | null;
  activitySeconds: number;
  isActive: boolean;
};

export type TTimelineComponent = {
  scrollToTimeHour: () => void;
};
