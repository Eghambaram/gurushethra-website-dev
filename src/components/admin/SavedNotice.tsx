interface SavedNoticeProps {
  show: boolean;
  message?: string;
}

export function SavedNotice({ show, message = "Saved successfully." }: SavedNoticeProps) {
  if (!show) return null;

  return (
    <p
      className="px-4 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm mb-6"
      role="status"
    >
      {message}
    </p>
  );
}
