---
layout: componentLayout
breadcrumb_title: usePDF
title: usePDF
component_title: usePDF
dir: Integrations
description: Learn how to get started with the free and open-source Flowbite Svelte UI component library based on the utility classes from Tailwind CSS
---

<script>
  import { TableProp, TableDefaultRow, } from '../../utils'
  import { Heading, P, A } from '$lib';
  import { props as items} from '../../props/Drawer.json'
</script>

Use the Drawer component (or “off-canvas”) to show a fixed element relative to the document page from any side for navigation, contact forms, informational purposes or other user actions.

## Set up

```svelte example hideOutput
<script>
  import { Drawer, Button, CloseButton } from 'flowbite-svelte';
  import { sineIn } from 'svelte/easing';
</script>
```

## Default drawer

To initiate the drawer component you need to set the `let hidden=true`, `width` props to the drawer component itself.

For accessibility you should also set the `id` prop to the element. This will add the drawer `aria-labelledby=id` and `aria-controls=id` to the drawer component.

```svelte example
<script>
  import { Drawer, Button, CloseButton } from 'flowbite-svelte';
  import { sineIn } from 'svelte/easing';
  let hidden1 = true;
  let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn
  };
</script>

<div class="text-center">
  <Button on:click={() => (hidden1 = false)}>Show drawer</Button>
  <button>CLick me</button>
</div>

<Drawer transitionType="fly" {transitionParams} bind:hidden={hidden1} id='sidebar1'>
<div class='flex items-center'>
  <h5
    id="drawer-label"
    class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
    <svg class="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>Info
  </h5>
  <CloseButton on:click={() => (hidden1 = true)} class='mb-4 dark:text-white'/>
    </div>
  <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
    Supercharge your hiring by taking advantage of our <a
      href="/"
      class="text-blue-600 underline dark:text-blue-500 hover:no-underline">limited-time sale</a> for
    Flowbite Docs + Job Board. Unlimited access to over 190K top-ranked candidates and the #1 design
    job board.
  </p>
  <div class="grid grid-cols-2 gap-4">
    <Button color="light" href="/">Learn more</Button>
    <Button href="/" >Get access <svg class="w-4 h-4 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></Button>
  </div>
</Drawer>
```
