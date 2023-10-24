// CLoudFlare pages function
// @link: https://developers.cloudflare.com/pages/platform/functions/

export function onRequest(context) {
    // const url = 'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt'
    return new Response("Hello, world!")
}
