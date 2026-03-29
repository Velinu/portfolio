"use client";

import { useTransition } from "react";

interface Column<T> {
  header: string;
  render: (row: T) => React.ReactNode;
  width?: number;
}

interface AdminTableProps<T extends { id: string }> {
  columns: Column<T>[];
  rows: T[];
  onEdit?: (row: T) => void;
  onDelete?: (id: string) => Promise<void>;
}

export function AdminTable<T extends { id: string }>({
  columns,
  rows,
  onEdit,
  onDelete,
}: AdminTableProps<T>) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="w2k-sunken" style={{ background: "#fff", overflow: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
        <thead>
          <tr style={{ background: "var(--w2k-surface-dark)" }}>
            {columns.map((col, i) => (
              <th
                key={i}
                style={{
                  padding: "3px 8px",
                  textAlign: "left",
                  borderBottom: "1px solid var(--w2k-mid-dark)",
                  borderRight: "1px solid var(--w2k-mid-dark)",
                  fontWeight: "bold",
                  width: col.width,
                }}
              >
                {col.header}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th style={{ padding: "3px 8px", width: 80 }}>Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                style={{ padding: 16, textAlign: "center", color: "#666" }}
              >
                No records found.
              </td>
            </tr>
          ) : (
            rows.map((row, ri) => (
              <tr
                key={row.id}
                style={{ background: ri % 2 === 0 ? "#fff" : "#f5f5f5" }}
              >
                {columns.map((col, ci) => (
                  <td
                    key={ci}
                    style={{
                      padding: "3px 8px",
                      borderBottom: "1px solid #eee",
                      borderRight: "1px solid #eee",
                      maxWidth: 300,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {col.render(row)}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td style={{ padding: "3px 6px", borderBottom: "1px solid #eee" }}>
                    <div style={{ display: "flex", gap: 4 }}>
                      {onEdit && (
                        <button
                          className="w2k-btn"
                          onClick={() => onEdit(row)}
                          style={{ minWidth: "auto", padding: "1px 6px" }}
                        >
                          ✏️
                        </button>
                      )}
                      {onDelete && (
                        <button
                          className="w2k-btn"
                          disabled={pending}
                          onClick={() =>
                            startTransition(() => onDelete(row.id))
                          }
                          style={{ minWidth: "auto", padding: "1px 6px" }}
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
