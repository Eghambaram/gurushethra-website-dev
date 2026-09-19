import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ErrorNotice } from "@/components/admin/ErrorNotice";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { markSubmissionRead, markSubmissionReplied, deleteSubmission } from "./actions";

interface Props {
  searchParams: Promise<{ error?: string }>;
}

const STATUS_STYLES: Record<string, string> = {
  new: "bg-brand-gold/10 text-brand-gold",
  read: "bg-white/10 text-gray-300",
  replied: "bg-green-500/10 text-green-400",
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function AdminSubmissionsPage({ searchParams }: Props) {
  const { error } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
  const submissions = data ?? [];

  return (
    <>
      <AdminPageHeader title="Submissions" description="Contact form entries from the public site." />
      <ErrorNotice message={error} />

      <div className="flex flex-col gap-4">
        {submissions.map((s) => (
          <div
            key={s.id}
            className={`p-5 rounded-xl bg-brand-surface border flex flex-col gap-3 ${s.status === "new" ? "border-brand-gold/30" : "border-white/8"}`}
          >
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <p className="text-white font-semibold text-sm">{s.name}</p>
                <p className="text-gray-500 text-xs">{s.phone} · {s.email}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${STATUS_STYLES[s.status] ?? STATUS_STYLES.new}`}>
                  {s.status}
                </span>
                <span className="text-gray-600 text-xs whitespace-nowrap">{formatDate(s.created_at)}</span>
              </div>
            </div>

            <p className="text-gray-500 text-xs">
              <span className="text-gray-400 font-semibold">Program:</span> {s.program}
            </p>
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{s.message}</p>

            <div className="flex items-center gap-3 pt-3 border-t border-white/5">
              {s.status === "new" && (
                <form action={markSubmissionRead.bind(null, s.id)}>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wide rounded border border-white/10 text-gray-300 hover:border-brand-gold hover:text-brand-gold transition-colors"
                  >
                    Mark as Read
                  </button>
                </form>
              )}
              {s.status === "read" && (
                <form action={markSubmissionReplied.bind(null, s.id)}>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wide rounded border border-white/10 text-gray-300 hover:border-brand-gold hover:text-brand-gold transition-colors"
                  >
                    Mark as Replied
                  </button>
                </form>
              )}
              <DeleteButton action={deleteSubmission.bind(null, s.id)} confirmMessage={`Delete this submission from "${s.name}"? This cannot be undone.`} />
            </div>
          </div>
        ))}

        {submissions.length === 0 && <p className="text-gray-500 text-sm py-8 text-center">No submissions yet.</p>}
      </div>
    </>
  );
}
