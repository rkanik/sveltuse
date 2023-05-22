# SVELTUSE

# 🔥🔥🔥 Contributors Needed 🔥🔥🔥

Collection of essential Svelte Utility Functions.

[![npm version](https://badgen.net/npm/v/sveltuse)](https://www.npmjs.com/package/sveltuse)
[![npm downloads](https://badgen.net/npm/dw/sveltuse)](https://www.npmjs.com/package/sveltuse)
[![npm downloads](https://badgen.net/npm/dt/sveltuse)](https://www.npmjs.com/package/sveltuse)
[![license](https://badgen.net/npm/license/sveltuse)](https://github.com/rkanik/sveltuse/blob/main/LICENSE)

**⚠️ Sveltuse is currently in early development and APIs and packages are likely to change quite often.**

# 🔥🔥🔥 Contributors Needed 🔥🔥🔥

# 📦 Install

```bash example
npm install sveltuse
```

```bash example
yarn add sveltuse # Using yarn
```

```bash example
pnpm install sveltuse # Using pnpm
```

# 🦄 Usage

```ts
import {
	useCounter,
	useMediaQuery,
	useBreakpoints,
	breakpointsTailwind
} from 'sveltuse'

const { count, inc, dec, set, reset } = useCounter(1, { min: 0, max: 100 })

const breakpoints = useBreakpoints(breakpointsTailwind)

const isLargeScreen = useMediaQuery('(min-width: 1024px)')
const isPreferredDark = useMediaQuery('(prefers-color-scheme: dark)')
```

Refer to [functions list](https://sveltuse.pages.dev/docs/functions/useCounter) or [documentations](https://sveltuse.pages.dev) for more details.

## Contribute

Please read [how to contribute](https://sveltuse.pages.dev/docs/pages/how-to-contribute) if you'd like to be part of the Flowbite community of contributors.

## License

Sveltuse is open-source under the [MIT License](https://sveltuse.pages.dev/docs/pages/license).
