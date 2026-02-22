'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Save, LogOut, Briefcase, FileCode2 } from 'lucide-react';
import type { Project, Template } from '@/lib/mockData';

// ─── shared styled atoms ────────────────────────────────────────────────────
const INPUT_STYLE: React.CSSProperties = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  color: 'rgba(255,255,255,0.7)',
  borderRadius: '10px',
  padding: '8px 12px',
  fontSize: '13px',
  width: '100%',
  outline: 'none',
  fontFamily: 'inherit',
  fontWeight: 300,
};

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[9px] uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>
        {label}
      </label>
      <input style={INPUT_STYLE} {...props}
        onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.2)'; }}
        onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)'; }} />
    </div>
  );
}

function TextArea({ label, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[9px] uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>
        {label}
      </label>
      <textarea
        style={{ ...INPUT_STYLE, resize: 'vertical', minHeight: '72px' }}
        {...props}
        onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(255,255,255,0.2)'; }}
        onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
      />
    </div>
  );
}

function PrimaryBtn({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] transition-all duration-150 cursor-pointer disabled:opacity-40"
      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.65)', fontFamily: 'inherit', fontWeight: 400 }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)'; }}
      {...props}
    >
      {children}
    </button>
  );
}

function DangerBtn({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-150 cursor-pointer"
      style={{ background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.12)', color: 'rgba(248,113,113,0.55)', fontFamily: 'inherit' }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(248,113,113,0.1)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(248,113,113,0.06)'; }}
      {...props}
    >
      {children}
    </button>
  );
}

// ─── Project form ────────────────────────────────────────────────────────────
const BLANK_PROJECT: Omit<Project, 'id'> = {
  title: '', slug: '', summary: '', problem: '', approach: '', outcome: '',
  metrics: [], stack: [], tags: [], featured: false,
};

function ProjectForm({ initial, onSave, onCancel }: {
  initial?: Project; onSave: (p: Project) => void; onCancel: () => void;
}) {
  const [form, setForm] = useState<Omit<Project, 'id'>>(initial ?? BLANK_PROJECT);
  const s = (k: keyof typeof form, v: unknown) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="rounded-xl p-5 space-y-4"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Title" value={form.title} onChange={(e) => s('title', e.target.value)} placeholder="AI Support Agent" />
        <Field label="Slug" value={form.slug} onChange={(e) => s('slug', e.target.value)} placeholder="ai-support-agent" />
      </div>
      <TextArea label="Summary (1 line)" value={form.summary} onChange={(e) => s('summary', e.target.value)} rows={2} />
      <TextArea label="Problem" value={form.problem} onChange={(e) => s('problem', e.target.value)} rows={3} />
      <TextArea label="Build / Approach" value={form.approach} onChange={(e) => s('approach', e.target.value)} rows={3} />
      <TextArea label="Outcome" value={form.outcome} onChange={(e) => s('outcome', e.target.value)} rows={2} />
      <Field label="Stack (comma-separated)" value={form.stack.join(', ')}
        onChange={(e) => s('stack', e.target.value.split(',').map((x) => x.trim()).filter(Boolean))}
        placeholder="n8n, GPT-4, Slack" />
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 cursor-pointer text-[13px]" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'inherit', fontWeight: 300 }}>
          <input type="checkbox" checked={form.featured} onChange={(e) => s('featured', e.target.checked)} />
          featured
        </label>
        <Field label="Live URL" value={form.liveUrl ?? ''} onChange={(e) => s('liveUrl', e.target.value)} placeholder="https://..." />
        <Field label="GitHub URL" value={form.githubUrl ?? ''} onChange={(e) => s('githubUrl', e.target.value)} placeholder="https://..." />
      </div>
      <div className="flex gap-2 pt-1">
        <PrimaryBtn onClick={() => onSave({ ...(initial ?? {}), ...form, id: initial?.id ?? '' } as Project)}>
          <Save size={13} /> save
        </PrimaryBtn>
        <button onClick={onCancel} className="px-4 py-2 rounded-xl text-[13px] transition-all cursor-pointer"
          style={{ border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.3)', fontFamily: 'inherit', fontWeight: 300 }}>
          cancel
        </button>
      </div>
    </div>
  );
}

// ─── Template form ────────────────────────────────────────────────────────────
const BLANK_TEMPLATE: Omit<Template, 'id'> = { title: '', slug: '', description: '', stack: [] };

function TemplateForm({ initial, onSave, onCancel }: {
  initial?: Template; onSave: (t: Template) => void; onCancel: () => void;
}) {
  const [form, setForm] = useState<Omit<Template, 'id'>>(initial ?? BLANK_TEMPLATE);
  const s = (k: keyof typeof form, v: unknown) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="rounded-xl p-5 space-y-4"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Title" value={form.title} onChange={(e) => s('title', e.target.value)} />
        <Field label="Slug" value={form.slug} onChange={(e) => s('slug', e.target.value)} />
      </div>
      <TextArea label="Description" value={form.description} onChange={(e) => s('description', e.target.value)} rows={3} />
      <Field label="Stack (comma-separated)" value={form.stack.join(', ')}
        onChange={(e) => s('stack', e.target.value.split(',').map((x) => x.trim()).filter(Boolean))} />
      <Field label="GitHub URL" value={form.githubUrl ?? ''} onChange={(e) => s('githubUrl', e.target.value)} />
      <Field label="Download URL" value={form.downloadUrl ?? ''} onChange={(e) => s('downloadUrl', e.target.value)} />
      <div className="flex gap-2 pt-1">
        <PrimaryBtn onClick={() => onSave({ ...(initial ?? {}), ...form, id: initial?.id ?? '' } as Template)}>
          <Save size={13} /> save
        </PrimaryBtn>
        <button onClick={onCancel} className="px-4 py-2 rounded-xl text-[13px] transition-all cursor-pointer"
          style={{ border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.3)', fontFamily: 'inherit', fontWeight: 300 }}>
          cancel
        </button>
      </div>
    </div>
  );
}

// ─── Main dashboard ───────────────────────────────────────────────────────────
type Tab = 'projects' | 'templates';

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null | 'new'>(null);
  const [editingTemplate, setEditingTemplate] = useState<Template | null | 'new'>(null);

  const load = useCallback(async () => {
    const [pRes, tRes] = await Promise.all([
      fetch('/api/admin/projects'),
      fetch('/api/admin/templates'),
    ]);
    if (pRes.status === 401) { router.push('/admin'); return; }
    const [p, t] = await Promise.all([pRes.json(), tRes.json()]);
    setProjects(Array.isArray(p) ? p : []);
    setTemplates(Array.isArray(t) ? t : []);
  }, [router]);

  useEffect(() => { load(); }, [load]);

  const logout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin');
  };

  const saveProject = async (p: Project) => {
    const method = p.id ? 'PUT' : 'POST';
    await fetch('/api/admin/projects', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p) });
    setEditingProject(null);
    load();
  };
  const deleteProject = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    await fetch('/api/admin/projects', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    load();
  };

  const saveTemplate = async (t: Template) => {
    const method = t.id ? 'PUT' : 'POST';
    await fetch('/api/admin/templates', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(t) });
    setEditingTemplate(null);
    load();
  };
  const deleteTemplate = async (id: string) => {
    if (!confirm('Delete this template?')) return;
    await fetch('/api/admin/templates', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    load();
  };

  return (
    <div className="min-h-screen" style={{ background: '#0C0C0C', fontFamily: 'var(--font-jb), monospace' }}>
      {/* Top bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4"
        style={{ background: 'rgba(12,12,12,0.95)', borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)' }}>
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.5)' }} />
          <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 400 }}>admin dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-[11px] transition-colors" style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 300 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.25)'; }}>
            view site
          </a>
          <button onClick={logout}
            className="flex items-center gap-1.5 text-[11px] transition-colors cursor-pointer"
            style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'inherit', fontWeight: 300 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(248,113,113,0.6)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.25)'; }}>
            <LogOut size={12} strokeWidth={1.5} /> logout
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        {/* Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl w-fit"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          {([['projects', Briefcase, 'projects'], ['templates', FileCode2, 'templates']] as const).map(([key, Icon, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] transition-all duration-150 cursor-pointer"
              style={{
                background: tab === key ? 'rgba(255,255,255,0.06)' : 'transparent',
                border: tab === key ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                color: tab === key ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)',
                fontFamily: 'inherit',
                fontWeight: 400,
              }}>
              <Icon size={13} strokeWidth={1.5} />
              {label}
            </button>
          ))}
        </div>

        {/* Projects tab */}
        {tab === 'projects' && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>
                projects <span style={{ color: 'rgba(255,255,255,0.2)' }}>({projects.length})</span>
              </p>
              <PrimaryBtn onClick={() => setEditingProject('new')}>
                <Plus size={13} /> add project
              </PrimaryBtn>
            </div>

            <AnimatePresence>
              {editingProject === 'new' && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <ProjectForm onSave={saveProject} onCancel={() => setEditingProject(null)} />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              {projects.length === 0 && (
                <p className="text-[13px] py-8 text-center" style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 300 }}>
                  no projects yet.
                </p>
              )}
              {projects.map((p) => (
                <div key={p.id}>
                  <div className="flex items-center justify-between p-4 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] truncate" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>{p.title}</p>
                      <p className="text-xs mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 300 }}>{p.summary}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {p.featured && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-md"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>
                          featured
                        </span>
                      )}
                      <button onClick={() => setEditingProject((cur) => cur === p ? null : p)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                        style={{ border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.3)' }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}>
                        <Edit2 size={12} strokeWidth={1.5} />
                      </button>
                      <DangerBtn onClick={() => deleteProject(p.id)}>
                        <Trash2 size={11} strokeWidth={1.5} />
                      </DangerBtn>
                    </div>
                  </div>
                  <AnimatePresence>
                    {editingProject === p && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mt-2">
                        <ProjectForm initial={p} onSave={saveProject} onCancel={() => setEditingProject(null)} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Templates tab */}
        {tab === 'templates' && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>
                templates <span style={{ color: 'rgba(255,255,255,0.2)' }}>({templates.length})</span>
              </p>
              <PrimaryBtn onClick={() => setEditingTemplate('new')}>
                <Plus size={13} /> add template
              </PrimaryBtn>
            </div>

            <AnimatePresence>
              {editingTemplate === 'new' && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <TemplateForm onSave={saveTemplate} onCancel={() => setEditingTemplate(null)} />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              {templates.length === 0 && (
                <p className="text-[13px] py-8 text-center" style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 300 }}>
                  no templates yet.
                </p>
              )}
              {templates.map((t) => (
                <div key={t.id}>
                  <div className="flex items-center justify-between p-4 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] truncate" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>{t.title}</p>
                      <p className="text-xs mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 300 }}>{t.description}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button onClick={() => setEditingTemplate((cur) => cur === t ? null : t)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                        style={{ border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.3)' }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}>
                        <Edit2 size={12} strokeWidth={1.5} />
                      </button>
                      <DangerBtn onClick={() => deleteTemplate(t.id)}>
                        <Trash2 size={11} strokeWidth={1.5} />
                      </DangerBtn>
                    </div>
                  </div>
                  <AnimatePresence>
                    {editingTemplate === t && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mt-2">
                        <TemplateForm initial={t} onSave={saveTemplate} onCancel={() => setEditingTemplate(null)} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
