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

import { IconName, type TIcons } from '@/types/baseComponents.types';

export const ICONS: TIcons = {
  [IconName.ARROW_PATH]: ArrowPath,
  [IconName.CHECK_CIRCLE]: CheckCircle,
  [IconName.PAUSE]: Pause,
  [IconName.PLAY]: Play,
  [IconName.PLUS]: Plus,
  [IconName.TRASH]: Trash,
  [IconName.X_MARK]: XMark,
  [IconName.CHART_BAR]: ChartBar,
  [IconName.CLOCK]: Clock,
  [IconName.LIST_BULLET]: ListBullet,
};
