import BasicDraggable from "./basic-draggable";
import BasicDrop from "./basic-drop";
import HandlePressDelay from "./handle-press-delay";

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
];
