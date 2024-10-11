export enum ButtonColor {
  PRIMARY = 'bg-purple-500 enabled:hover:bg-purple-600 text-white',
  SUCCESS = 'bg-green-500 enabled:hover:bg-green-600 text-white',
  WARNING = 'bg-yellow-500 enabled:hover:bg-yellow-600 text-white',
  NEUTRAL = 'bg-gray-100 enabled:hover:bg-gray-200',
  DANGER = 'bg-red-500 enabled:hover:bg-red-600 text-white',
}

export type TOption = {
  value: number | string;
  label: string;
};