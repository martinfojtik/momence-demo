import React, { useState } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'

import Converter from './Converter'
import ExchangeRates from './ExchangeRates'
import { Currencies } from "../types"

const url = window.location.host.includes('localhost')  ? '/daily.txt' : '/rates'

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(400px, 1fr));
    grid-gap: var(--gap-medium);
    margin-bottom: var(--gap-medium);

    @media (max-width: 860px) {
        grid-template-columns: 1fr;
    }
`

export const Title = styled.h2`
    margin-bottom: 0;
    text-align: center;
`

function MainContainer() {
    const [date, setDate] = useState<string>()

    const {isLoading, data, error} = useQuery<Currencies>('currencyData', async () => {
        const request = await fetch(url, {
            cache: "no-cache",
            referrerPolicy: "no-referrer",
            credentials: "omit"})

        if (!request.ok) {
            throw new Error(`Can't fetch data!`)
        }

        const data = await request.text()
        const rows = data.split('\n')
        setDate(rows[0])
        const currencies = new Map()

        rows.slice(2).forEach((row) => {
            const [country, currency, amount, code, rate] = row.split('|')

            if (country && currency) {
                currencies.set(code, {
                    country,
                    currency,
                    amount: Number(amount),
                    code,
                    rate: Number(rate),
                })
            }
        })

        return currencies
    })

    if (isLoading) {
        return <Container>Loading...</Container>
    }

    if (error || !data || !data.size) {
        return <Container>Error: Can't get rates data!</Container>
    }

    return (
        <Container>
            <ExchangeRates date={date} currencies={data}/>
            <Converter currencies={data}/>
        </Container>
    )
}

export default MainContainer
