---
id: 1
layout: PostLayout

# Sidebar link
href: /core/useMounted
hrefText:

# Heading
title: useMounted
description: Reactive isMounted variable.
---

## Usage

```svelte example
<script lang="ts">
import { useMounted } from 'sveltuse'

const isMounted = useMounted()
</script>

{#if $isMounted}
   <div>
      Component is mounted
   </div>
{/if}
```

Which is essentially a shorthand of:

```ts
import { onMount } from 'svelte'

let isMounted = false

onMount(() => {
	isMounted = true
})
```
