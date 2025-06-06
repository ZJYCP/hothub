interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}
interface NavMenuItem {
  label: string;
  href?: string;
}
export interface SiteConfig {
  name: string;
  description: string;
  navItems: NavItem[];
  navMenuItems: NavMenuItem[];
  links: Record<string, string>;
}

export const siteConfig: SiteConfig = {
  name: 'HotTrends - 实时热搜动态聚合平台',
  description: 'HotTrends提供实时热搜话题的监测与分析，帮助您了解当前的热门话题趋势。',
  navItems: [
    {
      label: '首页',
      href: '/',
    },
    {
      label: '热点',
      href: '/trends',
    },
    // {
    //   label: '创作',
    //   href: '/compose',
    // },
    {
      label: '开发',
      children: [
        {
          label: 'OpenAPI',
          href: '/openapi',
        },
        {
          label: 'API文档',
          href: '/openapi/docs',
        },
      ],
    },
    {
      label: '关于',
      href: '/about',
    },
  ],
  navMenuItems: [
    {
      label: 'Profile',
      href: '/profile',
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
    {
      label: 'Team',
      href: '/team',
    },
    {
      label: 'Calendar',
      href: '/calendar',
    },
    {
      label: 'Settings',
      href: '/settings',
    },
    {
      label: 'Help & Feedback',
      href: '/help-feedback',
    },
    {
      label: 'Logout',
      href: '/logout',
    },
  ],
  links: {
    github: 'https://github.com/ZJYCP/hothub',
    twitter: 'https://twitter.com/hero_ui',
    docs: 'https://heroui.com',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: 'https://patreon.com/jrgarciadev',
  },
};
