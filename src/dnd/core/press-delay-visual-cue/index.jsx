import {
  DndContext,
  PointerSensor,
  useDraggable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useRef, useState } from "react";

const PRESS_DELAY_MS = 10000;

function DraggableWithPressCue({ id = "item-press-cue", cueApiRef }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  const [isPressing, setIsPressing] = useState(false);
  const [progress, setProgress] = useState(0);

  const startAtRef = useRef(0);
  const rafRef = useRef(null);

  const stopCue = () => {
    setIsPressing(false);
    setProgress(0);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  };

  const startCue = () => {
    setIsPressing(true);
    setProgress(0);
    startAtRef.current = performance.now();

    const tick = (now) => {
      const elapsed = now - startAtRef.current;
      const p = Math.min(elapsed / PRESS_DELAY_MS, 1);
      setProgress(p);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  // expose API cho parent điều khiển cue (onDragStart/End/Cancel)
  cueApiRef.current = { stopCue };

  const onPointerDown = (e) => {
    listeners?.onPointerDown?.(e);
    startCue();
  };

  const onPointerUp = (e) => {
    listeners?.onPointerUp?.(e);
    stopCue();
  };

  const onPointerCancel = (e) => {
    listeners?.onPointerCancel?.(e);
    stopCue();
  };

  const onPointerLeave = (e) => {
    listeners?.onPointerLeave?.(e);
    if (!isDragging) stopCue();
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        width: 360,
        borderRadius: 14,
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
        opacity: isDragging ? 0.9 : 1,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          border: "1px solid #e5e7eb",
          background: isPressing ? "#eff6ff" : "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: isDragging ? "grabbing" : "grab",
          touchAction: "none",
          fontWeight: 900,
          position: "relative",
          overflow: "hidden",
        }}
        {...attributes}
        {...listeners}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onPointerLeave={onPointerLeave}
        title={`Nhấn giữ ~${PRESS_DELAY_MS}ms để bắt đầu kéo`}
      >
        ⠿
        {isPressing && !isDragging && (
          <div
            style={{
              position: "absolute",
              left: 6,
              right: 6,
              bottom: 6,
              height: 5,
              borderRadius: 999,
              background: "rgba(148,163,184,0.35)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${Math.round(progress * 100)}%`,
                background: progress >= 1 ? "#10b981" : "#2563eb",
                transition: "width 30ms linear",
              }}
            />
          </div>
        )}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 900 }}>Press delay + Visual cue</div>
        <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
          Giữ handle để hiện progress. Đủ {PRESS_DELAY_MS}ms mới kéo được.
        </div>

        <div
          style={{
            height: 6,
            borderRadius: 999,
            background: "#e2e8f0",
            overflow: "hidden",
            marginTop: 6,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${Math.round(progress * 100)}%`,
              background: progress >= 1 ? "#10b981" : "#2563eb",
              transition: "width 30ms linear",
            }}
          />
        </div>

        <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 6 }}>
          Trạng thái:{" "}
          <b style={{ color: isDragging ? "#10b981" : "#0f172a" }}>
            {isDragging ? "Dragging" : isPressing ? "Pressing..." : "Idle"}
          </b>
        </div>
      </div>
    </div>
  );
}

export default function PressDelayVisualCueExample() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: PRESS_DELAY_MS, tolerance: 6 },
    })
  );

  const cueApiRef = useRef({ stopCue: () => {} });

  return (
    <DndContext
      sensors={sensors}
      onDragStart={() => {
        // ✅ drag đã thực sự bắt đầu => tắt cue ngay
        cueApiRef.current.stopCue();
      }}
      onDragCancel={() => {
        cueApiRef.current.stopCue();
      }}
      onDragEnd={() => {
        cueApiRef.current.stopCue();
      }}
    >
      <DraggableWithPressCue cueApiRef={cueApiRef} />
    </DndContext>
  );
}
