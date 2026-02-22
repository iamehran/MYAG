import fs from 'fs';
import path from 'path';
import { Project, Template } from './mockData';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');

function read<T>(file: string): T[] {
  try {
    const raw = fs.readFileSync(path.join(DATA_DIR, file), 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(file: string, data: unknown[]): void {
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2), 'utf-8');
}

// Projects
export const getProjects = (): Project[] => read<Project>('projects.json');
export const saveProjects = (data: Project[]): void => write('projects.json', data);

// Templates
export const getTemplates = (): Template[] => read<Template>('templates.json');
export const saveTemplates = (data: Template[]): void => write('templates.json', data);
