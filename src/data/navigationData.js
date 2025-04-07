export const navigationItems = {
  features: {
    title: 'Features',
    items: [
      {
        title: 'Research Planning',
        items: [
          {
            label: 'Roadmap Generation',
            url: '/features/roadmap-generation',
            description: 'AI-powered research roadmap creation',
            color: 'blue'
          },
          {
            label: 'Milestone Tracking',
            url: '/features/milestone-tracking',
            description: 'Track and manage research milestones',
            color: 'green'
          },
          {
            label: 'Progress Analytics',
            url: '/features/progress-analytics',
            description: 'Visualize research progress and insights',
            color: 'purple'
          }
        ]
      },
      {
        title: 'Collaboration',
        items: [
          {
            label: 'Team Workspace',
            url: '/features/team-workspace',
            description: 'Collaborative research environment',
            color: 'orange'
          },
          {
            label: 'Sharing & Export',
            url: '/features/sharing-export',
            description: 'Share and export research roadmaps',
            color: 'red'
          }
        ]
      }
    ],
    bottomLinks: [
      {
        label: 'View all features',
        url: '/features'
      },
      {
        label: 'Feature comparison',
        url: '/features/compare'
      }
    ]
  },
  resources: {
    title: 'Resources',
    items: [
      {
        title: 'Learning',
        items: [
          {
            label: 'Documentation',
            url: '/resources/documentation',
            description: 'Complete guide to using Frontier',
            color: 'blue'
          },
          {
            label: 'Tutorials',
            url: '/resources/tutorials',
            description: 'Step-by-step learning guides',
            color: 'green'
          },
          {
            label: 'Examples',
            url: '/resources/examples',
            description: 'Research roadmap examples',
            color: 'purple'
          }
        ]
      },
      {
        title: 'Community',
        items: [
          {
            label: 'Research Hub',
            url: '/resources/research-hub',
            description: 'Connect with researchers',
            color: 'orange'
          },
          {
            label: 'Blog',
            url: '/resources/blog',
            description: 'Latest research insights',
            color: 'red'
          }
        ]
      }
    ],
    bottomLinks: [
      {
        label: 'View all resources',
        url: '/resources'
      },
      {
        label: 'Get started',
        url: '/resources/getting-started'
      }
    ]
  },
  research: {
    title: 'Research',
    items: [
      {
        title: 'Research Areas',
        items: [
          { label: 'Computer Science', url: '/research/computer-science' },
          { label: 'Machine Learning', url: '/research/machine-learning' },
          { label: 'Data Science', url: '/research/data-science' },
          { label: 'AI & Robotics', url: '/research/ai-robotics' }
        ]
      },
      {
        title: 'Community',
        items: [
          { label: 'Research Groups', url: '/research/groups' },
          { label: 'Events', url: '/research/events' },
          { label: 'Publications', url: '/research/publications' },
          { label: 'Research Grants', url: '/research/grants' }
        ]
      }
    ]
  },
  company: {
    title: 'Company',
    items: [
      {
        title: 'About',
        items: [
          { label: 'Our Mission', url: '/about/mission' },
          { label: 'Team', url: '/about/team' },
          { label: 'Careers', url: '/about/careers' },
          { label: 'Contact', url: '/about/contact' }
        ]
      }
    ]
  }
}; 