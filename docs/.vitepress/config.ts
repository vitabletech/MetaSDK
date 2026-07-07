import { defineConfig } from 'vitepress';
import { readFileSync } from 'fs';
import { join } from 'path';

// Read package.json version dynamically
const pkgPath = join(process.cwd(), '../package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Meta-SDK',
  description: 'A highly scalable, modern Node.js SDK for the Meta Graph API.',
  cleanUrls: true,
  appearance: 'dark',
  head: [
    ['meta', { name: 'theme-color', content: '#0064e0' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { rel: 'icon', href: '/favicon/favicon.ico' }],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        href: '/favicon/favicon-96x96.png',
      },
    ],
    [
      'link',
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon/favicon.svg' },
    ],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicon/apple-touch-icon.png',
      },
    ],
    ['link', { rel: 'manifest', href: '/favicon/site.webmanifest' }],
  ],
  themeConfig: {
    logo: '/logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/installation' },
      {
        text: `v${pkg.version}`,
        items: [
          {
            text: 'Changelog',
            link: 'https://github.com/vitabletech/Meta-SDK/releases',
          },
          {
            text: 'NPM',
            link: 'https://www.npmjs.com/package/@vitabletech/meta-sdk',
          },
        ],
      },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Why Our SDK?', link: '/guide/architecture' },
          { text: 'Prerequisites', link: '/guide/prerequisites' },
          { text: 'FAQ', link: '/guide/faq' },
        ],
      },
      {
        text: 'Getting Started',
        items: [
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Authentication', link: '/guide/authentication' },
        ],
      },
      {
        text: 'Core Features',
        items: [
          { text: 'Facebook Graph API', link: '/guide/facebook' },
          { text: 'Instagram Graph API', link: '/guide/instagram' },
          { text: 'Webhooks Handler', link: '/guide/webhooks' },
          { text: 'Pagination', link: '/guide/pagination' },
          { text: 'Custom Requests', link: '/guide/custom-requests' },
        ],
      },
      {
        text: 'Advanced',
        items: [
          { text: 'Error Handling', link: '/guide/error-handling' },
          { text: 'Network Whitelist', link: '/guide/network-whitelist' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vitabletech/Meta-SDK' },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',
        },
        link: 'https://vitabletech.in',
      },
      { icon: 'facebook', link: 'https://www.facebook.com/vitabletech' },
      { icon: 'youtube', link: 'https://www.youtube.com/@vitabletech' },
      { icon: 'instagram', link: 'https://www.instagram.com/vitabletech' },
      {
        icon: 'linkedin',
        link: 'https://www.linkedin.com/company/vitabletech',
      },
    ],

    footer: {
      message:
        'Developed by <a href="https://github.com/msrajawat298" target="_blank">Mayank Singh Rajawat</a>',
      copyright:
        'Copyright © 2026 <a href="https://vitabletech.in" target="_blank">Vitabletech</a>',
    },
  },
});
