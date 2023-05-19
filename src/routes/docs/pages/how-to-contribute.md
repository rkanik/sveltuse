---
layout: componentLayout
breadcrumb_title: How to Contribute - SveltUse
title: How to Contribute - SveltUse
component_title: Contributing
dir: Pages
description: Learn how you can start contributing to the open-source SveltUse UI component library
---

Here are some guidelines we'd like you to follow before submitting a PR.

## Create a fork

Create a fork from [sveltuse](https://github.com/rkanik/sveltuse) to your repository first.

## Please use pnpm to install

The repo uses `pnpm`, so using `pnpm` is desirable when you fork and install dependencies to avoid unseen problems.

When there is a change in `package.json`, remove `pnpm-lock.yml` and `node_modules` directory and run `pnpm i`.

## Conventional commit

When making a commit, we recommend using [the Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).

Some examples are:

```sh
feat: add rating component
fix: add if statement to Button component
chore: clean up About page
docs: add timeline page
style: update home page
test: add modal test
```

Use `!` for a minor bump.

```sh
feat!: add drawer component and page
```

When you have a breaking change:

```
git commit -a "feat: change btnClass name to bClass" -m "BREAKING CHANGE: change the Button component attributes"
```

## Playwright Test

Before submitting a PR, please run a test:

```sh
npm run test
```

If you want to run an single test file, `tests/typography.spec.ts`:

```sh
npx playwright test tests/typography.spec.ts
```