export type TTimelineItem = {
  hour: number;
  activityId: string | null;
  activitySeconds: number;
  isActive: number | null;
};

export type TTimelineComponent = {
  scrollToTimeHour: () => void;
};
