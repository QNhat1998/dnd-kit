import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { useState } from "react";

function DraggableItem({ id }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  const style = {
    width: 120,
    height: 120,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0ea5e9",
    color: "white",
    fontWeight: 800,
    userSelect: "none",
    touchAction: "none",
    cursor: isDragging ? "grabbing" : "grab",
    opacity: isDragging ? 0.85 : 1,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {id}
    </div>
  );
}

function DropZone({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  const style = {
    width: 280,
    height: 180,
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: isOver ? "#ecfdf5" : "#f8fafc",
    border: isOver ? "2px solid #10b981" : "2px dashed #cbd5e1",
    color: "#0f172a",
    fontWeight: 800,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}

export default function BasicDrop() {
  const [dropped, setDropped] = useState(false);

  return (
    <DndContext
      onDragEnd={({ active, over }) => {
        if (over?.id === "drop-zone" && active.id === "item-1") {
          setDropped(true);
        }
      }}
    >
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        {!dropped ? (
          <DraggableItem id="item-1" />
        ) : (
          <div style={{ width: 120 }} />
        )}

        <DropZone id="drop-zone">
          {dropped ? "✅ Dropped!" : "Drop here"}
        </DropZone>

        <button
          type="button"
          onClick={() => setDropped(false)}
          disabled={!dropped}
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #e5e7eb",
            background: dropped ? "#fff" : "#f1f5f9",
            cursor: dropped ? "pointer" : "not-allowed",
            fontWeight: 800,
          }}
        >
          Reset
        </button>
      </div>
    </DndContext>
  );
}
