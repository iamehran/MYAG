export const projectSchema = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (R: any) => R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (R: any) => R.required() },
    { name: 'summary', title: 'Short Summary', type: 'text', rows: 2 },
    { name: 'problem', title: 'Problem', type: 'text', rows: 3 },
    { name: 'approach', title: 'Approach / Build', type: 'text', rows: 4 },
    { name: 'outcome', title: 'Outcome', type: 'text', rows: 3 },
    {
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Label', type: 'string' },
          { name: 'value', title: 'Value', type: 'string' },
        ],
      }],
    },
    {
      name: 'stack',
      title: 'Stack / Tools',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: ['SaaS', 'E-commerce', 'AI tooling', 'Operations', 'Sales', 'Support'] },
    },
    { name: 'featured', title: 'Featured', type: 'boolean', initialValue: false },
    { name: 'media', title: 'Media (GIF/Screenshot)', type: 'image' },
    { name: 'liveUrl', title: 'Live URL', type: 'url' },
    { name: 'githubUrl', title: 'GitHub URL', type: 'url' },
  ],
  preview: {
    select: { title: 'title', subtitle: 'summary' },
  },
};
