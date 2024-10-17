import type { Component } from 'vue';

export enum ButtonColor {
  PRIMARY = 'bg-purple-500 enabled:hover:bg-purple-600 text-white',
  SUCCESS = 'bg-green-500 enabled:hover:bg-green-600 text-white',
  WARNING = 'bg-yellow-500 enabled:hover:bg-yellow-600 text-white',
  NEUTRAL = 'bg-gray-100 enabled:hover:bg-gray-200',
  DANGER = 'bg-red-500 enabled:hover:bg-red-600 text-white',
}

export type TSelectOption<T> = {
  value: T;
  label: string;
};

export type TIcons = Record<string, Component>;

export enum IconName {
  ARROW_PATH = 'ArrowPath',
  CHECK_CIRCLE = 'CheckCircle',
  PAUSE = 'Pause',
  PLAY = 'Play',
  PLUS = 'Plus',
  TRASH = 'Trash',
  X_MARK = 'XMark',
  CHART_BAR = 'ChartBar',
  CLOCK = 'Clock',
  LIST_BULLET = 'ListBullet',
}
