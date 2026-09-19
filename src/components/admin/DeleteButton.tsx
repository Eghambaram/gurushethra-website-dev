"use client";
import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  action: () => void | Promise<void>;
  confirmMessage?: string;
}

export function DeleteButton({ action, confirmMessage = "Are you sure? This cannot be undone." }: DeleteButtonProps) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
    >
      <button
        type="submit"
        aria-label="Delete"
        className="p-2 text-gray-400 hover:text-red-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded"
      >
        <Trash2 size={16} />
      </button>
    </form>
  );
}
