"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiPlus, FiTrash2, FiSave, FiLoader } from "react-icons/fi";
import { Faq } from "@prisma/client";

export function FaqManager({ faqs }: { faqs: Faq[] }) {
  const router = useRouter();
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [creating, setCreating] = useState(false);
  const [drafts, setDrafts] = useState<Record<string, { question: string; answer: string }>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const inputClass =
    "w-full rounded-xl border border-black/10 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-primary-500 dark:border-white/15";

  async function createFaq() {
    if (!newQuestion.trim() || !newAnswer.trim()) return;
    setCreating(true);
    try {
      await fetch("/api/admin/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: newQuestion, answer: newAnswer }),
      });
      setNewQuestion("");
      setNewAnswer("");
      router.refresh();
    } finally {
      setCreating(false);
    }
  }

  function getDraft(faq: Faq) {
    return drafts[faq.id] ?? { question: faq.question, answer: faq.answer };
  }

  async function saveFaq(faq: Faq) {
    const draft = getDraft(faq);
    setSavingId(faq.id);
    try {
      await fetch(`/api/admin/faqs/${faq.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      router.refresh();
    } finally {
      setSavingId(null);
    }
  }

  async function deleteFaq(faq: Faq) {
    if (!window.confirm("Delete this FAQ?")) return;
    setDeletingId(faq.id);
    try {
      await fetch(`/api/admin/faqs/${faq.id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-black/5 bg-surface p-6 shadow-sm dark:border-white/10">
        <h2 className="mb-4 font-display text-lg font-bold text-foreground">Add New FAQ</h2>
        <div className="space-y-3">
          <input
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Question"
            className={inputClass}
          />
          <textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Answer"
            rows={3}
            className={inputClass}
          />
          <button
            onClick={createFaq}
            disabled={creating}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-glow disabled:opacity-60"
          >
            {creating ? <FiLoader className="animate-spin" /> : <FiPlus />} Add FAQ
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => {
          const draft = getDraft(faq);
          return (
            <div key={faq.id} className="rounded-2xl border border-black/5 bg-surface p-5 shadow-sm dark:border-white/10">
              <input
                value={draft.question}
                onChange={(e) => setDrafts((d) => ({ ...d, [faq.id]: { ...draft, question: e.target.value } }))}
                className={`${inputClass} font-medium`}
              />
              <textarea
                value={draft.answer}
                onChange={(e) => setDrafts((d) => ({ ...d, [faq.id]: { ...draft, answer: e.target.value } }))}
                rows={2}
                className={`${inputClass} mt-2`}
              />
              <div className="mt-3 flex justify-end gap-1">
                <button
                  onClick={() => saveFaq(faq)}
                  disabled={savingId === faq.id}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-primary-500 hover:bg-primary-500/10"
                >
                  {savingId === faq.id ? <FiLoader className="animate-spin" size={14} /> : <FiSave size={14} />}
                </button>
                <button
                  onClick={() => deleteFaq(faq)}
                  disabled={deletingId === faq.id}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-red-500 hover:bg-red-500/10"
                >
                  {deletingId === faq.id ? <FiLoader className="animate-spin" size={14} /> : <FiTrash2 size={14} />}
                </button>
              </div>
            </div>
          );
        })}
        {faqs.length === 0 && <p className="py-10 text-center text-muted">No FAQs yet.</p>}
      </div>
    </div>
  );
}
