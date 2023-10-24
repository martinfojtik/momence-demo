import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'

import Converter from './Converter'
import ExchangeRates from './ExchangeRates'
import { Currencies } from "../types"

const url = window.location.host  ? '/daily.txt' : '/routes'

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: var(--gap-space);
    margin-bottom: var(--gap-space);
`

export const Title = styled.h2`
    margin-bottom: 0;
    text-align: center;
`

function MainContainer() {
    const [date, setDate] = useState<string>()
    const [currencies] = useState<Currencies>(new Map())

    const {isLoading, data, error} = useQuery('currencyData', () =>
        fetch(url, {
            cache: "no-cache",
            referrerPolicy: "no-referrer",
            credentials: "omit"})
            .then((res) => res.text())
        )

    useEffect(() => {
        if (!data) {
            return
        }

        const rows = data.split('\n')
        setDate(rows[0])

        rows.slice(2).forEach((row) => {
            const [country, currency, amount, code, rate] = row.split('|')
            currencies.set(code, {
                country,
                currency,
                amount: Number(amount),
                code,
                rate: Number(rate),
            })
        })
    }, [currencies, data])

    if (isLoading) {
        return <Container>Loading...</Container>
    }

    if (error || !data) {
        return <Container>Error: Can't get rates data!</Container>
    }

    return (
        <Container>
            <ExchangeRates date={date} currencies={currencies}/>
            <Converter currencies={currencies}/>
        </Container>
    )
}

export default MainContainer
