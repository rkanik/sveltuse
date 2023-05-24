---
id: 1
layout: PostLayout

# Sidebar link
href: /integrations/usePDF
hrefText:

# Heading
title: usePDF
description: Render PDF using `pdfjs-dist`.
---

## Sample pdf renderer

```svelte example
<script lang="ts">
	import classNames from 'classnames'
	import usePDF from 'sveltuse/integrations/usePDF'

	let pagesContainer: HTMLDivElement

	const {
		scale,
		viewport,
		pageNumber,
		pageNumbers,
		pageRenderer,
		thumbnailRenderer,
		goToNextPage,
		goToPreviousPage,
		zoomIn,
		zoomOut,
		download,
		print
	} = usePDF({
		initialScale: 0.9,
		src: '/pdf/sample.pdf',
		pagesContainerGetter: () => pagesContainer
	})
</script>

<div
    class="bg-gray-900 border border-gray-700 flex flex-col h-[80vh] overflow-hidden">
    <div
        class="flex-none h-12 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4">
        <h4>Sample PDF</h4>

        <div class="flex items-center">
            <div>
                <button on:click={goToPreviousPage}>Previous</button>
                <span>{$pageNumber}</span>
                <button on:click={goToNextPage}>Next</button>
            </div>

            <div class="h-4 w-px bg-gray-700 mx-4" />

            <div>
                <button on:click={zoomOut}>Zoom Out</button>
                <span>{Math.round($scale * 100)}%</span>
                <button on:click={zoomIn}>Zoom In</button>
            </div>
        </div>

        <div class="flex items-center space-x-2">
            <button on:click={() => download(`sample-${Date.now()}.pdf`)}
                >Download</button>
            <button on:click={print}>Print</button>
        </div>
    </div>
    <div class="flex space-x-2 flex-1 overflow-hidden">
        <div
            class="flex flex-col space-y-4 flex-none bg-gray-800 p-4 w-44 overflow-y-auto overflow-x-hidden">
            {#each $pageNumbers as number}
                <a
                    use:thumbnailRenderer={{ number }}
                    href="#page-{number}"
                    class={classNames(
                        'w-max border-2 p-1',
                        number === $pageNumber
                            ? 'border-blue-500'
                            : 'border-transparent hover:border-blue-500 opacity-60'
                    )}>
                    <canvas />
                </a>
            {/each}
        </div>

        <div
            bind:this={pagesContainer}
            class="space-y-8 flex-1 py-8 overflow-auto scroll-smooth"
            style={`--viewport-width:${$viewport.width}px;--viewport-height:${$viewport.height}px;`}>
            {#each $pageNumbers as number}
                <div
                    use:pageRenderer={{ number }}
                    id="page-{number}"
                    class="page relative mx-auto">
                    <canvas />
                    <div
                        id="text-layer"
                        class="absolute inset-0 textLayer"
                        style="--scale-factor:{$scale};" />
                </div>
            {/each}
        </div>
    </div>
</div>

<style lang="scss">
	.page {
		&,
		canvas:not([data-rendered='true']) {
			width: var(--viewport-width);
			height: var(--viewport-height);
		}
	}
</style>

```
