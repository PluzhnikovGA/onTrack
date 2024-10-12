export type TTimelineItem = {
  hour: number;
  activityId: string | null;
  activitySeconds: number;
};

export type TTimelineComponent = {
  scrollToTimeHour: () => void;
};
