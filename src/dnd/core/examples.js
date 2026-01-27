import BasicDraggable from "./basic-draggable";
import BasicDrop from "./basic-drop";
import HandlePressDelay from "./handle-press-delay";
import PressDelayVisualCueExample from "./press-delay-visual-cue";

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
];
