import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getProjects, saveProjects } from '@/lib/dataStore';
import { Project } from '@/lib/mockData';

async function guard() {
  const ok = await getAdminSession();
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return null;
}

export async function GET() {
  const err = await guard(); if (err) return err;
  return NextResponse.json(getProjects());
}

export async function POST(req: NextRequest) {
  const err = await guard(); if (err) return err;
  const body: Project = await req.json();
  const projects = getProjects();
  const newProject = { ...body, id: Date.now().toString(), slug: body.slug || slugify(body.title) };
  projects.push(newProject);
  saveProjects(projects);
  return NextResponse.json(newProject, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const err = await guard(); if (err) return err;
  const body: Project = await req.json();
  const projects = getProjects().map((p) => (p.id === body.id ? body : p));
  saveProjects(projects);
  return NextResponse.json(body);
}

export async function DELETE(req: NextRequest) {
  const err = await guard(); if (err) return err;
  const { id } = await req.json();
  saveProjects(getProjects().filter((p) => p.id !== id));
  return NextResponse.json({ ok: true });
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
