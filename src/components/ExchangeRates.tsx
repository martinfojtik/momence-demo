import React from 'react'
import styled from 'styled-components'
import { Title } from './MainContainer'
import { Currencies } from "../types"

const Subtitle = styled.p`
    font-size: 14px;
    margin-top: 0;
    text-align: center;
`

const DataList = styled.ul`
    margin: var(--gap-medium) 0 0;
    padding: 0;
    list-style: none;
`

interface Props {
    currencies: Currencies;
    date: string | undefined;
}

function ExchangeRates({date, currencies}: Props) {
    return (
        <div>
            <Title>Czech Koruna Exchange Rates</Title>
            <Subtitle>{date}</Subtitle>

            <DataList>
                {Array.from(currencies.keys()).map((currency) => {
                    const curr = currencies.get(currency)
                    if (curr == null) {
                        return null
                    }

                    return (
                        <li key={curr.code}>{`${curr.code} - ${curr.country} ${
                            curr.currency
                        } - ${(curr.amount / curr.rate).toLocaleString()}`}</li>
                    )
                })}
            </DataList>
        </div>
    )
}

export default ExchangeRates
