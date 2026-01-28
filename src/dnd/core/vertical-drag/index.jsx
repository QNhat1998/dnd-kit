import { DndContext, useDraggable } from '@dnd-kit/core'

function VerticalItem() {
  const { nodeRef, listeners, attributes, transform, isDragging } =
    useDraggable({
      id: "vertical-item",
    });

  const style = {
    width: 240,
    height: 56,
    borderRadius: 10,
    background: "#2563eb",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    paddingLeft: 16,
    fontWeight: 700,
    cursor: isDragging ? "grabbing" : "grab",
    userSelect: "none",
    touchAction: "none",
    transform: transform ? `translate3d(0, ${transform.y}px, 0)` : undefined,
  };

  return (
    <div ref={nodeRef} style={style} {...listeners} {...attributes}>
      Vertical drag item
    </div>
  );
}

export default function VerticalDragExample() {
  return (
    <DndContext>
      <div style={{ display: "grid", gap: 12 }}>
        <VerticalItem />
        <VerticalItem />
        <VerticalItem />
      </div>
    </DndContext>
  );
}
