export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  problem: string;
  approach: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  stack: string[];
  tags: string[];
  featured: boolean;
  mediaUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface Template {
  id: string;
  title: string;
  slug: string;
  description: string;
  stack: string[];
  downloadUrl?: string;
  githubUrl?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  content: string;
  avatarUrl?: string;
}

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'AI Support Agent',
    slug: 'ai-support-agent',
    summary: 'An AI agent that handles 80% of customer support tickets automatically.',
    problem: 'A SaaS startup was spending $12k/month on support staff for repetitive tier-1 tickets.',
    approach:
      'Built an n8n workflow with GPT-4 classification, Notion knowledge base retrieval, and auto-reply logic. Escalates edge cases to humans.',
    outcome:
      'Deflected 80% of tickets automatically. Team went from 3 support agents to 1. Saved $8k/month.',
    metrics: [
      { label: 'Tickets automated', value: '80%' },
      { label: 'Monthly savings', value: '$8k' },
      { label: 'Build time', value: '4 days' },
    ],
    stack: ['n8n', 'GPT-4', 'Notion', 'Slack', 'Webhooks'],
    tags: ['AI', 'SaaS', 'Support'],
    featured: true,
  },
  {
    id: '2',
    title: 'E-commerce Order Ops Pipeline',
    slug: 'ecommerce-order-ops',
    summary: 'End-to-end order processing automation for a DTC brand doing 500+ orders/day.',
    problem:
      'Manual order tracking, inventory sync errors, and late fulfilment notifications were killing their NPS.',
    approach:
      'Zapier + custom API integrations connecting Shopify → 3PL → Klaviyo → internal Airtable ops dashboard. Real-time inventory alerts via Slack.',
    outcome:
      'Zero manual order ops. Fulfilment errors dropped 94%. Customer NPS up 22 points in 60 days.',
    metrics: [
      { label: 'Manual ops eliminated', value: '100%' },
      { label: 'Fulfilment errors', value: '-94%' },
      { label: 'NPS lift', value: '+22pts' },
    ],
    stack: ['Zapier', 'Shopify', 'Klaviyo', 'Airtable', 'REST API'],
    tags: ['E-commerce', 'Operations', 'API'],
    featured: true,
  },
  {
    id: '3',
    title: 'Lead Enrichment & Routing',
    slug: 'lead-enrichment-routing',
    summary: 'Automated lead enrichment and intelligent routing for a B2B SaaS sales team.',
    problem:
      'SDRs were spending 2+ hours daily on manual research before making a single call.',
    approach:
      'n8n pipeline: Typeform → Apollo enrichment → Clearbit company data → GPT-4 ICP scoring → HubSpot assignment with personalised call notes.',
    outcome:
      'SDR research time went from 2hrs to 4 minutes per lead. Pipeline velocity improved 3x.',
    metrics: [
      { label: 'Research time', value: '2hr → 4min' },
      { label: 'Pipeline velocity', value: '3x' },
      { label: 'Leads processed/day', value: '200+' },
    ],
    stack: ['n8n', 'Apollo', 'Clearbit', 'HubSpot', 'GPT-4', 'Typeform'],
    tags: ['SaaS', 'Sales', 'AI'],
    featured: false,
  },
];

export const mockTemplates: Template[] = [
  {
    id: '1',
    title: 'AI Email Responder',
    slug: 'ai-email-responder',
    description:
      'n8n workflow that reads incoming emails, classifies intent, and drafts contextual replies using GPT-4. Plug in your knowledge base and go.',
    stack: ['n8n', 'Gmail', 'GPT-4', 'OpenAI'],
    githubUrl: 'https://github.com',
  },
  {
    id: '2',
    title: 'Webhook → Slack Notifier',
    slug: 'webhook-slack-notifier',
    description:
      'Universal webhook receiver that formats and routes events to the right Slack channels with rich message blocks. Supports 20+ event types.',
    stack: ['n8n', 'Slack', 'Webhooks'],
    githubUrl: 'https://github.com',
  },
  {
    id: '3',
    title: 'CRM Auto-enrichment',
    slug: 'crm-auto-enrichment',
    description:
      'Zapier zap that enriches new HubSpot contacts with Apollo data, company info, and LinkedIn profile — auto-updating the CRM record.',
    stack: ['Zapier', 'HubSpot', 'Apollo', 'LinkedIn'],
    githubUrl: 'https://github.com',
  },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    author: 'Alex Chen',
    role: 'Founder',
    company: 'Syncly',
    content:
      'Mehran fixed our entire ops stack in a week. Things that were breaking every other day just... work now. He thinks in systems, not tasks.',
  },
  {
    id: '2',
    author: 'Sarah Okonkwo',
    role: 'Head of Operations',
    company: 'Fable',
    content:
      'Hired him for a 2-week automation project, ended up having him rebuild our entire internal tooling. Best investment we made in Q3.',
  },
];
