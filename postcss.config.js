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
          /carousel-item/,
          // icons.css only holds icons found in the source (some built with template literals)
          /^fa/,
          // ScheduleTable.jsx builds schedule-event-<type> with a template literal
          /^schedule-event-/
        ],
        // modern.css dark theme: ThemeToggle sets it through dataset.theme, so the attribute
        // selector text never appears in the source
        greedy: [/data-theme/],
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
