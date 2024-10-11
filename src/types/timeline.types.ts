export type TTimelineItem = {
  hour: number;
  activityId: string | null;
  activitySeconds: number;
};

export type TUpdateTimelineItemActivitySeconds = (
  seconds: number,
  timelineItem: TTimelineItem,
) => void;

export type TSetTimelineItemActivity = (
  activityId: string | number | null,
  timelineItem: TTimelineItem,
) => void;

export type TTimelineComponent = {
  scrollToTimeHour: () => void;
};
