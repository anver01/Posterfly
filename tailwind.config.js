module.exports = {
  content: ['./pages/**/*.{html,js,jsx}', './components/**/*.{html,js,jsx}'],
  theme: {
    colors: {
      'pf-white': '#fff',
      'pf-black': '#000',
      'pf-red': '#e63946',
      'pf-grite': '#f1faee',
      'pf-lt-blue': '#a8dadc',
      'pf-indigo': '#457b9d',
      'pf-blue': '#1d3557'
    },
    extend: {
      backgroundImage: {
        'login-card-1': "url('/images/cf-bg.jpg')",
        'login-card-2': "url('/images/star-bg.jpeg')"
      }
    }
  },
  plugins: []
}
