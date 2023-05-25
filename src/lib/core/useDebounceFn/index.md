---
id: 1
layout: PostLayout

# Sidebar link
href: /core/useDebounceFn
hrefText:

# Heading
title: useDebounceFn
description: Debounce execution of a function.
---

> Debounce is an overloaded waiter: if you keep asking him your requests will be ignored until you stop and give him some time to think about your latest inquiry.

<br/>

Ported from [vueuse/useDebounceFn](https://vueuse.org/core/useDebounceFn)

## Example
```svelte example
<script setup lang="ts">
	import { Button } from 'flowbite-svelte'
	import { useDebounceFn } from 'sveltuse'

	let updated = 0
	let clicked = 0

	const debouncedFn = useDebounceFn(
		() => {
			updated += 1
		},
		1000,
		{ maxWait: 5000 }
	)

	function clickedFn() {
		clicked += 1
		debouncedFn()
	}
</script>

<div>
	<note>
		Delay is set to 1000ms and maxWait is set to 5000ms for this demo.
	</note>
	<p>Button clicked: {clicked}</p>
	<p>Event handler called: {updated}</p>
	<br />
	<Button on:click={clickedFn}>Smash me!</Button>
</div>
```

## Usage

```js
import { useDebounceFn } from 'sveltuse'

const debouncedFn = useDebounceFn(() => {
  // do something
}, 1000)

window.addEventListener('resize', debouncedFn)
```

You can also pass a 3rd parameter to this, with a maximum wait time, similar to [lodash debounce](https://lodash.com/docs/4.17.15#debounce)

```js
import { useDebounceFn } from 'sveltuse'

// If no invokation after 5000ms due to repeated input,
// the function will be called anyway.
const debouncedFn = useDebounceFn(() => {
  // do something
}, 1000, { maxWait: 5000 })

window.addEventListener('resize', debouncedFn)
```

Optionally, you can get the return value of the function using promise operations.

```js
import { useDebounceFn } from 'sveltuse'

const debouncedRequest = useDebounceFn(() => 'response', 1000)

debouncedRequest().then((value) => {
  console.log(value) // 'response'
})

// or use async/await
async function doRequest() {
  const value = await debouncedRequest()
  console.log(value) // 'response'
}
```

Since unhandled rejection error is quite annoying when developer doesn't need the return value, the promise will **NOT** be rejected if the function is canceled **by default**. You need to specify the option `rejectOnCancel: true` to capture the rejection.

```js
import { useDebounceFn } from 'sveltuse'

const debouncedRequest = useDebounceFn(() => 'response', 1000, { rejectOnCancel: true })

debouncedRequest()
  .then((value) => {
    // do something
  })
  .catch(() => {
    // do something when canceled
  })

// calling it again will cancel the previous request and gets rejected
setTimeout(debouncedRequest, 500)
```
## Recommended Reading

- [**Debounce vs Throttle**: Definitive Visual Guide](https://redd.one/blog/debounce-vs-throttle)