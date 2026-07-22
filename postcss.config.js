import purgecss from '@fullhuman/postcss-purgecss'

export default {
  plugins: [
    purgecss({
      content: [
        './index.html',
        './src/**/*.js',
        './src/**/*.jsx'
      ],
      safelist: {
        standard: [
          /navbar-collapse/,
          /show/,
          /collapsing/,
          /active/,
          /fade/,
          /modal-backdrop/,
          /dropdown-menu/,
          /dropdown-item/,
          /carousel-item/
        ],
        deep: [
          /^modal/,
          /^nav/,
          /^carousel/,
          /^dropdown/,
          /^col-/,
          /^d-/,
          /^m-/,
          /^p-/,
          /^bg-/,
          /^text-/,
          /^btn-/
        ]
      }
    })
  ]
}
