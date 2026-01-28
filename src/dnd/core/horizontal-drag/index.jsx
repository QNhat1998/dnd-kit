import { DndContext, useDraggable } from "@dnd-kit/core";

function HorizontalItem({ id }) {
  const { setNodeRef, listeners, attributes, transform, isDragging } =
    useDraggable({
      id,
    });

  const style = {
    width: 120,
    height: 80,
    borderRadius: 12,
    background: "#0ea5e9",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    cursor: isDragging ? "grabbing" : "grab",
    userSelect: "none",
    touchAction: "none",
    transform: transform
      ? `translate3d(${transform.x}px, 0px, 0)` // ❗ khoá Y
      : undefined,
  };
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {id}
    </div>
  );
}

export default function HorizontalDragExample() {
  return (
    <DndContext>
      <div style={{ display: "flex", gap: 12 }}>
        <HorizontalItem id="A" />
        <HorizontalItem id="B" />
        <HorizontalItem id="C" />
      </div>
    </DndContext>
  );
}
