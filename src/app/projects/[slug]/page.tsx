import { mockProjects } from '@/lib/mockData';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return mockProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = mockProjects.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} — Mehran Firdous`,
    description: project.summary,
    keywords: project.stack,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = mockProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="min-h-screen px-6 py-12 max-w-2xl mx-auto"
      style={{ background: '#0C0C0C', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-jb), monospace' }}>
      <Link
        href="/canvas"
        className="inline-flex items-center gap-2 transition-colors mb-10"
        style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.03em' }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        back to canvas
      </Link>

      {project.featured && (
        <span className="inline-block text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-md mb-4"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>
          featured
        </span>
      )}

      <h1 className="mb-3" style={{ fontSize: '22px', fontWeight: 400, color: 'rgba(255,255,255,0.85)', letterSpacing: '-0.01em' }}>
        {project.title}
      </h1>
      <p className="mb-8" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>{project.summary}</p>

      <div className="space-y-7">
        {[
          { label: 'problem', content: project.problem },
          { label: 'build', content: project.approach },
          { label: 'outcome', content: project.outcome },
        ].map(({ label, content }) => (
          <div key={label}>
            <p className="text-[9px] uppercase tracking-[0.25em] mb-2" style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 400 }}>{label}</p>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 300 }}>{content}</p>
          </div>
        ))}

        {project.metrics.length > 0 && (
          <div>
            <p className="text-[9px] uppercase tracking-[0.25em] mb-3" style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 400 }}>results</p>
            <div className="grid grid-cols-3 gap-3">
              {project.metrics.map((m) => (
                <div key={m.label} className="rounded-xl p-3 text-center"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p style={{ fontSize: '18px', fontWeight: 400, color: 'rgba(255,255,255,0.75)' }}>{m.value}</p>
                  <p className="text-[9px] mt-1 leading-tight" style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 300 }}>{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="text-[9px] uppercase tracking-[0.25em] mb-3" style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 400 }}>stack</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="text-[11px] px-2 py-0.5 rounded-md"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
