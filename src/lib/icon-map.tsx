import {
  FaHardHat,
  FaDraftingCompass,
  FaHammer,
  FaRulerCombined,
  FaClipboardList,
  FaPaintRoller,
  FaBuilding,
  FaTools,
} from "react-icons/fa";
import { IconType } from "react-icons";

export const ICON_MAP: Record<string, IconType> = {
  HardHat: FaHardHat,
  Compass: FaDraftingCompass,
  Hammer: FaHammer,
  Ruler: FaRulerCombined,
  ClipboardList: FaClipboardList,
  PaintRoller: FaPaintRoller,
  Building: FaBuilding,
  Tools: FaTools,
};

export const ICON_OPTIONS = Object.keys(ICON_MAP);

export function getServiceIcon(name: string): IconType {
  return ICON_MAP[name] ?? FaHardHat;
}
