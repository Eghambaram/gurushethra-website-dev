interface ErrorNoticeProps {
  message?: string;
}

export function ErrorNotice({ message }: ErrorNoticeProps) {
  if (!message) return null;

  return (
    <p
      className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm mb-6"
      role="alert"
    >
      {message}
    </p>
  );
}
