module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0D0D2B',
        purple: '#2B076E',
        'custom-1': '#3671E9',
      },
      backgroundImage: {
        'hero-subtitle-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.00) 100%)',
        'hero-button-gradient': 'linear-gradient(135deg, #2B076E 0%, #0D0D2B 100%)',
        'button-border-gradient': 'linear-gradient(#0D0D2B, #0D0D2B) padding-box, linear-gradient(135deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.00) 100%) border-box',
        'features-bg': 'linear-gradient(180deg, rgba(43, 7, 110, 0.20) 0%, rgba(43, 7, 110, 0.00) 100%)',
        'pricing-gradient-text': 'linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.38) 100%)',
        'footer-bg-gradient': 'linear-gradient(90deg, #2B076E 0%, #0D0D2B 100%)',
      },
      boxShadow: {
        'button': '0px 4px 32px 0px rgba(54, 113, 233, 0.25)',
      },
      spacing: {
        '17.5': '4.375rem',
        '22.5': '5.625rem',
        '25': '6.25rem',
        '27.5': '6.875rem',
        '35': '8.75rem',
        '45': '11.25rem',
      },
      fontSize: {
        'heading-1': '4rem',
        'heading-2': '3rem',
        'heading-4': '2.25rem',
        'heading-5': '1.5rem',
        'heading-6': '1.25rem',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.features-row-border': {
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.00) 100%)',
        },
        '.nav-gradient': {
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.00) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.10)',
        },
        '.hero-circle-gradient': {
          background: 'radial-gradient(50% 50% at 50% 50%, rgba(54, 113, 233, 0.12) 0%, rgba(54, 113, 233, 0.00) 100%)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}