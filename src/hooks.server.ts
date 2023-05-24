const redirects: Record<string, string> = {
	[`/core`]: '/core/useCounter',
	[`/integrations`]: '/integrations/usePDF'
}

export const handle = async ({ event, resolve }) => {
	const redirectPathname = redirects[event.url.pathname]
	if (redirectPathname) {
		return Response.redirect(redirectPathname, 301)
	}
	return await resolve(event)
}
