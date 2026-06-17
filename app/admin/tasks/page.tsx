"use client";

import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CSSProperties } from "react";
import { toast } from "sonner";
import { getData, putData } from "@/lib/api";
import { StatusBadge } from "@/components/common/status-badge";

const columns = ["todo", "in_progress", "review", "testing", "done"] as const;

export default function AdminTasksPage() {
  const qc = useQueryClient();
  const { data = [] } = useQuery({ queryKey: ["tasks"], queryFn: () => getData<any[]>("/api/tasks") });
  const update = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => putData(`/api/tasks/${id}`, { status }),
    onError: () => toast.error("❌ Gagal update task"),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const task = data.find((t) => String(t.id) === result.draggableId);
    if (!task) return;
    update.mutate({ id: task.id, status: result.destination.droppableId });
  };

  return (
    <div>
      <h1 className="mb-6 text-4xl font-bold tracking-tight">Tasks</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          {columns.map((col) => (
            <Droppable key={col} droppableId={col}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-96 rounded-2xl bg-muted/50 p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase">{col.replace("_", " ")}</h3>
                    <span className="rounded-full bg-card px-2 py-1 text-xs">{data.filter((t) => t.status === col).length}</span>
                  </div>
                  <div className="space-y-3">
                    {data.filter((t) => t.status === col).map((task, idx) => (
                      <Draggable key={task.id} draggableId={String(task.id)} index={idx}>
                        {(p) => (
                          <div
                            ref={p.innerRef}
                            {...p.draggableProps}
                            {...p.dragHandleProps}
                            style={p.draggableProps.style as CSSProperties}
                            className="rounded-xl border border-border bg-card p-3 shadow-sm"
                          >
                            <p className="font-medium">{task.title}</p>
                            <div className="mt-2"><StatusBadge status={task.priority} /></div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
