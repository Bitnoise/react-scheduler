# Release v0.6.4

- the bundled Inter font files are no longer inlined as base64 in `dist/index.css` (about 178 kB, most of it font data): they are now shipped as regular files in `dist/fonts/` and referenced with relative urls, so bundlers emit them as separate cacheable assets and browsers only download the subsets they need (latin-ext is rarely requested). The stylesheet itself shrinks to under 1 kB. No consumer change is needed with a bundler that resolves `url()` in CSS (webpack `css-loader`, Vite, ...); if you copy `dist/index.css` by hand, copy `dist/fonts/` next to it

# Release v0.6.3

- fixed the grid jumping after a strong swipe: the previous / next period is now loaded once the scroll, including swipe momentum, has settled
- loading no longer blocks the infinite scroll: when the scroll goes past the period being loaded, `onRangeChange` is called again with the new range while `isLoading` is still true, so the consumer can cancel or ignore the pending request (e.g. with an `AbortController`)
- fixed the infinite scroll no longer loading after a touch whose end was missed

# Release v0.6.2

- fixed the grid jumping when scrolling horizontally past the rendered period: the scroll position is now shifted by exactly the width of the added columns, so the visible dates stay in place
- the previous / next period is now loaded as soon as the edge is approached, without the 300ms delay, so a fast scroll no longer stops against the end of the grid
- the grid and header canvases are redrawn before paint, so they never briefly show the previous dates
- modernized the loading animation: the loading edge now fades softly into the grid with a subtle shimmer and a thin indeterminate progress bar in the accent colour, and it respects `prefers-reduced-motion`

# Release v0.6.1

- the Inter font is now bundled with the package (latin and latin-ext subsets, weights 400 to 800) instead of loaded from Google Fonts, so the scheduler no longer makes any request to a third-party server

# Release v0.6.0

- redesigned the UI: top bar with a segmented zoom selector, chevron navigation and a round theme toggle, frosted sticky left column with initials avatars, restyled tiles, tooltip, loader and pagination buttons
- redesigned the grid and header: clearer weekends, highlighted current day with a round day number marker, dimmed off-hours in the hourly view, and header labels that stay visible while scrolling horizontally
- added a mobile layout below 768px wide
- added `onThemeChange` config callback, called when the theme toggle switches the theme
- added `zoomLevels` and `toggleTheme` topbar translations, in every built-in language
- tile text colour now supports `rgb()` / `rgba()` and `#rgb` backgrounds (it was always white with these formats), and can be forced through the tile `style.color`
- fixed tiles starting a few hours before the first visible day being placed one day too far right
- fixed the left column tooltip showing `undefined` when a row has no subtitle

# Release v0.5.0

- added `onCellClick` callback, fired when clicking an empty cell of a resource row
- added `onCellRangeSelect` callback, fired when dragging a selection across several cells of the same resource row (the range can be dragged in either direction)
- added `selectedCell` prop to highlight a cell or a range of cells on the grid
- added tile drag & drop with the `onTileMove` callback, which gives the new resource and dates of the moved tile (the original duration is kept)
- added a ghost preview of the drop location while dragging a tile
- added `draggable` property on resource items to disable dragging for specific tiles (defaults to `true`)
- added `style` property on resource items to apply custom inline styles to a tile (e.g. `backgroundImage`)
- added a slide transition when navigating to the previous / next period
- exported `CellClickData`, `CellRangeSelectData`, `SelectedRange` and `TileMoveData` types
- fixed styled-components style props leaking to the DOM by using transient (`$`-prefixed) props

# Release v0.4.1

- fixed weeks being wrongly placed on the grid

# Release v0.4.0

- package forked and published as `@code-rhapsodie/react-scheduler`
- added `fr`, `es`, `he`, `it`, `pt-BR` and `ro` translations
- upgraded to React 19, styled-components 6, TypeScript 7 and Vite 8
- migrated ESLint to the flat config format

# Release v0.3.1

- aligned tile text to the left

# Release v0.3.0

- added hourly view (`zoom: 2`)
- added dark mode with `showThemeToggle` and `defaultTheme` config properties
- added custom theme configuration
- centered the empty box message
- fixed type definitions
- upgraded React to 18.3.1

# Release v0.2.1

- added example of scheduler data filtering in readme.md
- added `lt` language
- improved scrolling and fixed current date column offset
- fixed tile placement when a project starts and ends before / after an existing project in the same row

# Release v0.2

- added `showTooltip` property to scheduler's config object for showing / hiding tooltip when hovering over the tiles
- added `translations` property to scheduler's config object which allow user to add a custom translations
