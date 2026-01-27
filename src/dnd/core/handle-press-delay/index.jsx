import {
  DndContext,
  PointerSensor,
  useDraggable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";

function DraggableWithHandle({ id = "item-1" }) {
  const [clickCount, setClickCount] = useState(0);
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  const containerStyle = {
    width: 320,
    borderRadius: 16,
    border: "1px solid #e5e7eb",
    background: "#fff",
    padding: 12,
    display: "flex",
    gap: 12,
    alignItems: "center",
    userSelect: "none",
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.85 : 1,
    boxShadow: isDragging
      ? "0 12px 30px rgba(0,0,0,0.15)"
      : "0 6px 16px rgba(0,0,0,0.06)",
  };

  const handleStyle = {
    width: 36,
    height: 36,
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    background: "#f8fafc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: isDragging ? "grabbing" : "grab",
    touchAction: "none",
    fontWeight: 900,
    color: "#0f172a",
  };

  const bodyStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  };

  const titleStyle = { fontWeight: 800, color: "#0f172a" };
  const descStyle = { fontSize: 12, color: "#64748b" };

  return (
    <div ref={setNodeRef} style={containerStyle}>
      {/* Drag handle: CHỈ handle nhận listeners + attributes */}
      <div
        style={handleStyle}
        {...listeners}
        {...attributes}
        aria-label="Drag handle"
        title="Giữ vào đây để kéo"
      >
        ⠿
      </div>

      {/* Body: click bình thường, không kích hoạt drag */}
      <div style={bodyStyle}>
        <div style={titleStyle}>Item có Drag Handle</div>
        <div style={descStyle}>
          Chỉ kéo được khi giữ vào handle. Thân item click được bình thường.
        </div>

        <button
          type="button"
          onClick={() => setClickCount((c) => c + 1)}
          style={{
            marginTop: 6,
            padding: "8px 10px",
            borderRadius: 10,
            border: "1px solid #e5e7eb",
            background: "#fff",
            cursor: "pointer",
            fontWeight: 700,
            width: "fit-content",
          }}
        >
          Click test: {clickCount}
        </button>
      </div>
    </div>
  );
}

export default function HandlePressDelay() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 6,
      },
    })
  );

  return (
    <DndContext sensors={sensors}>
      <div style={{ display: "grid", gap: 12 }}>
        <div style={{ fontWeight: 900, fontSize: 16 }}>
          Core – Drag Handle + Press Delay
        </div>
        <div style={{ fontSize: 13, color: "#64748b" }}>
          - Giữ vào handle (⠿) để kéo <br />- Giữ ~200ms mới bắt đầu drag (tránh
          click nhầm)
        </div>

        <DraggableWithHandle id="item-1" />

        <div style={{ fontSize: 12, color: "#94a3b8" }}>
          Tip: tăng delay lên 250–350ms nếu người dùng hay click nhầm.
        </div>
      </div>
    </DndContext>
  );
}
