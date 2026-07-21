/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#5B5FC7',
          hover: '#4F52B2',
          soft: '#E3E3F7',
          border: '#D8D8F0',
          surface: '#F7F7FF',
        },
        ink: {
          strong: '#242424',
          DEFAULT: '#424242',
          muted: '#616161',
          subtle: '#8A8A8A',
        },
        surface: {
          canvas: '#F6F6F9',
          muted: '#F0F0F5',
          hover: '#F2F2F7',
        },
        line: {
          DEFAULT: '#E1E1E8',
          subtle: '#ECECF1',
          muted: '#ECECF3',
          input: '#D1D1D8',
          strong: '#C7C7CF',
        },
        success: {
          50: '#F2FAF5',
          100: '#E7F5EF',
          200: '#E7F3EC',
          300: '#B7D7C3',
          700: '#107C41',
          800: '#0F6C4D',
          900: '#0E5A2B',
        },
        danger: {
          50: '#FFF8F8',
          100: '#FFF4F4',
          200: '#FDE7E9',
          300: '#F3C6C9',
          700: '#A4262C',
          900: '#7A1F25',
        },
        warning: {
          100: '#FFF4CE',
          700: '#8A5700',
        },
        info: {
          100: '#E8F1FB',
          700: '#185B8C',
        },
        accent: {
          teal: '#00A6A6',
          amber: '#D97706',
          rose: '#C4314B',
        },
      },
      backgroundImage: {
        'custom-gradient-navbar-header': 'linear-gradient(90deg, rgba(204, 204, 204, 0) 0%, rgba(190, 190, 190, 0.2) 100%, rgba(173, 173, 173, 0.2) 100%, rgba(173, 173, 173, 0.2) 100%)',
      },
      fontSize: {
        micro: ['0.5625rem', { lineHeight: '0.75rem' }],
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        caption: ['0.6875rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        eyebrow: '0.16em',
      },
      maxWidth: {
        workspace: '93.75rem',
      },
      minHeight: {
        empty: '60vh',
      },
      gridTemplateColumns: {
        'work-row': 'minmax(0, 1fr) 7.5rem 7.5rem',
        'timeline-row': '6.25rem minmax(0, 1fr) 7.5rem',
      },
    },
  },
  plugins: [],
}
