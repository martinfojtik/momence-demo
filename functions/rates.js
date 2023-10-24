// CLoudFlare pages function
// @link: https://developers.cloudflare.com/pages/platform/functions/

export async function onRequest(context) {
    const url = 'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt'
    const request = await fetch(url)

    if (!request.ok) {
        return new Response('Cant get rates from CNB', {status: 500})
    }

    return new Response(await request.body())
}
