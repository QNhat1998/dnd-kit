import { useMemo, useState } from "react";
import { CORE_EXAMPLES } from "../dnd/core/examples";

export default function DndPlayground() {
  const examples = useMemo(() => CORE_EXAMPLES, []);
  const [activeKey, setActiveKey] = useState(examples[0].key);

  const active = examples.find((e) => e.key === activeKey) || examples[0];
  const ActiveComponent = active.component;

  return (
    <div style={{ minHeight: "100vh", padding: 24, background: "#f8fafc" }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>
        DnD Kit Playground
      </h1>

      <div
        style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}
      >
        {examples.map((ex) => (
          <button
            key={ex.key}
            onClick={() => setActiveKey(ex.key)}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              background: activeKey === ex.key ? "#2563eb" : "#ffffff",
              color: activeKey === ex.key ? "#ffffff" : "#0f172a",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {ex.title}
          </button>
        ))}
      </div>

      <div style={{ color: "#64748b", marginBottom: 16, fontSize: 13 }}>
        {active.description}
      </div>

      <div
        style={{
          background: "#ffffff",
          borderRadius: 16,
          padding: 24,
          border: "1px solid #e5e7eb",
        }}
      >
        <ActiveComponent />
      </div>
    </div>
  );
}
