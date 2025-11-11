import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: '王同学',
  description:
    '生活；技术；分享；博客；',
  href: 'https://astro-erudite.vercel.app',
  author: '王同学',
  locale: 'zh-CN',
  featuredPostCount: 2,
  postsPerPage: 3,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blog',
    label: '博客',
  },
    {
    href: 'https://photo.wangtopia.top', 
    label: '相册',
  },
  {
    href: '/about',
    label: '关于',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/codemaster1024',
    label: 'GitHub',
  },
  {
    href: 'https://wangtopia.top',
    label: 'Website',
  },
  {
    href: 'mailto:locuswq@gmail.com',
    label: 'Email',
  },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
  相册: 'lucide:camera',
}
