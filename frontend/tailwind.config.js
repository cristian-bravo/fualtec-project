import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--brand-primary)',
        accent: 'var(--brand-accent)',
        surface: '#ffffff',
        muted: '#0a1a2f'
      },
      fontFamily: {
        sans: ['"Montserrat"', '"Roboto"', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
};
