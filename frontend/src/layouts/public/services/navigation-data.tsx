const companyItems = [
  { to: '/quienes-somos', label: 'Quienes somos' },
  { to: '/historia', label: 'Nuestra historia' },
  { to: '/mision', label: 'Misión' },
  { to: '/vision', label: 'Visión' },
  { to: '/valores', label: 'Valores' },
];

const socialLinks = [
  {
    href: 'https://www.tiktok.com/@fualtec',
    label: 'TikTok',
    viewBox: '0 0 24 24',
    svg: (
      <path
        d="M15 3c.6 1.6 2 3 3.6 3.4V9c-1.5-.1-2.8-.7-3.6-1.6v6.1a5 5 0 1 1-5-5c.5 0 1 .1 1.5.3v2.7a2.5 2.5 0 1 0 1 2V3h2.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    href: 'https://www.instagram.com/fualtec',
    label: 'Instagram',
    viewBox: '0 0 24 24',
    svg: (
      <>
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
      </>
    ),
  },
  {
    href: 'https://www.facebook.com/fualtec',
    label: 'Facebook',
    viewBox: '0 0 24 24',
    svg: (
      <path
        d="M14 8h3V5h-3c-2 0-3 1.5-3 3.4V11H8v3h3v5h3v-5h3l1-3h-4V8.4c0-.3.2-.4.5-.4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export { companyItems, socialLinks };
