export const testimonialSchema = {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    { name: 'author', title: 'Author Name', type: 'string', validation: (R: any) => R.required() },
    { name: 'role', title: 'Role', type: 'string' },
    { name: 'company', title: 'Company', type: 'string' },
    { name: 'content', title: 'Quote', type: 'text', rows: 4, validation: (R: any) => R.required() },
    { name: 'avatar', title: 'Avatar', type: 'image' },
  ],
  preview: {
    select: { title: 'author', subtitle: 'company' },
  },
};
