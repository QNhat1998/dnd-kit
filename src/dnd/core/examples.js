import BasicDraggable from "./basic-draggable";
import BasicDrop from "./basic-drop";
import HandlePressDelay from "./handle-press-delay";
import HorizontalDragExample from './horizontal-drag'
import PressDelayVisualCueExample from "./press-delay-visual-cue";
import VerticalDragExample from "./vertical-drag";

export const CORE_EXAMPLES = [
  {
    key: "basic-draggable",
    title: "Basic Draggable",
    description: "useDraggable cơ bản – kéo tự do (core)",
    component: BasicDraggable,
  },
  {
    key: "basic-drop",
    title: "Basic Drop",
    description: "useDraggable + useDroppable + onDragEnd (core)",
    component: BasicDrop,
  },
  {
    key: "handle-press-delay",
    title: "Handle + Press Delay",
    description: "Chỉ kéo từ handle + giữ 200ms mới kéo (core)",
    component: HandlePressDelay,
  },
  {
    key: "press-delay-visual-cue",
    title: "Press Delay + Visual Cue",
    description: "Nhấn giữ để hiện progress; đủ thời gian mới kéo được (core)",
    component: PressDelayVisualCueExample,
  },
  {
    key: "vertical-drag",
    title: "Vertical Drag",
    description: "Chỉ kéo theo trục Y (core)",
    component: VerticalDragExample,
  },
    {
    key: "horizontal-drag",
    title: "Horizontal Drag",
    description: "Chỉ kéo theo trục X (core)",
    component: HorizontalDragExample,
  },
];
