import {
  ArrowPathIcon as ArrowPath,
  ChartBarIcon as ChartBar,
  CheckCircleIcon as CheckCircle,
  ClockIcon as Clock,
  ListBulletIcon as ListBullet,
  PauseIcon as Pause,
  PlayIcon as Play,
  PlusIcon as Plus,
  TrashIcon as Trash,
  XMarkIcon as XMark,
} from '@heroicons/vue/24/outline';

import { IconNames, type TIcons } from '@/types/base-components.types';

export const ICONS: TIcons = {
  [IconNames.ARROW_PATH]: ArrowPath,
  [IconNames.CHECK_CIRCLE]: CheckCircle,
  [IconNames.PAUSE]: Pause,
  [IconNames.PLAY]: Play,
  [IconNames.PLUS]: Plus,
  [IconNames.TRASH]: Trash,
  [IconNames.X_MARK]: XMark,
  [IconNames.CHART_BAR]: ChartBar,
  [IconNames.CLOCK]: Clock,
  [IconNames.LIST_BULLET]: ListBullet,
};
