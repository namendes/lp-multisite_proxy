import { NextResponse } from 'next/server'

export async function middleware(request: Request) {

    const url = new URL(request.url)
    const origin = url.origin
    const pathname = url.pathname
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-url', request.url)
    requestHeaders.set('x-origin', origin)
    requestHeaders.set('x-pathname', pathname)
    const siteTermUid = pathname.split("/")[1]
    
    const sites = [
        {
            uid: "site0",
            url:"http://localhost:3000"
        },
        {
            uid: "site1",
            url:"http://localhost:3001"
        }
    ]
 
    const site = sites.find((term: any) => term.uid === siteTermUid);

    if (url.searchParams.has('live_preview') && site ) {       
        return NextResponse.redirect(
            `${site.url}${pathname.replace(`/${siteTermUid}`, "")}${url.search}`
        )
    }

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        }
    })
}