import { DndContext, useDraggable } from "@dnd-kit/core";

function DraggableBox() {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: "drag-box" });

  const style = {
    width: 120,
    height: 120,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#2563eb",
    color: "white",
    fontWeight: 800,
    userSelect: "none",
    touchAction: "none",
    cursor: isDragging ? "grabbing" : "grab",
    opacity: isDragging ? 0.85 : 1,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    boxShadow: isDragging
      ? "0 12px 30px rgba(0,0,0,0.15)"
      : "0 8px 20px rgba(0,0,0,0.08)",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      Drag me
    </div>
  );
}

export default function BasicDraggable() {
  return (
    <DndContext>
      <DraggableBox />
    </DndContext>
  );
}
