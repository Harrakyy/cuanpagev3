"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel,
  variant = "default",
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel: string;
  variant?: "danger" | "default";
}) {
  return (
    <AlertDialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 w-[95vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card p-6">
          <AlertDialog.Title className="text-xl font-semibold">{title}</AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-muted-foreground">{description}</AlertDialog.Description>
          <div className="mt-6 flex justify-end gap-2">
            <AlertDialog.Cancel className="rounded-full border border-border px-4 py-2">Batal</AlertDialog.Cancel>
            <AlertDialog.Action
              onClick={onConfirm}
              className={variant === "danger" ? "rounded-full bg-red-600 px-4 py-2 text-white" : "rounded-full bg-foreground px-4 py-2 text-background"}
            >
              {confirmLabel}
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
