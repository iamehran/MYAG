export const templateSchema = {
  name: 'template',
  title: 'Template',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (R: any) => R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (R: any) => R.required() },
    { name: 'description', title: 'Description', type: 'text', rows: 3 },
    { name: 'stack', title: 'Stack / Tools', type: 'array', of: [{ type: 'string' }] },
    { name: 'downloadUrl', title: 'Download URL', type: 'url' },
    { name: 'githubUrl', title: 'GitHub URL', type: 'url' },
  ],
  preview: {
    select: { title: 'title', subtitle: 'description' },
  },
};
