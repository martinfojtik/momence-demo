import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Title } from './MainContainer'
import ConvertedAmount from './ConvertedAmount'
import { Currencies } from "../types"

const Form = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    margin: var(--gap-small) 0;
    grid-gap: var(--gap-small);

    @media (max-width: 400px)  {
        display: flex;
        flex-direction: column;
    }
`

const ButtonContainer = styled.div`
    grid-column: 1 / span 2;
    display: flex;
`

const Button = styled.button`
    flex: 1 1 100%;
    cursor: pointer;
`

function Converter({ currencies }: { currencies: Currencies; }) {
    const [ammount, setAmmount] = useState<string>('')
    const [selectedCurrency, setSelectedCurrency] = useState<string>()
    const [displayConversion, setDisplayConversion] = useState<boolean>(false)

    useEffect(() => {
        if (selectedCurrency == null && currencies.size > 0) {
            setSelectedCurrency(currencies.entries().next().value[0])
        }
    }, [currencies, selectedCurrency])

    return (
        <div>
            <Title>Czech Koruna Converter</Title>

            <Form>
                <label>Czech Koruna to convert:</label>
                <input
                    type="number"
                    value={ammount}
                    onChange={(e) => {
                        setAmmount(e.target.value)
                        setDisplayConversion(false)
                    }}
                />

                <label>
                    Currency to convert to:
                </label>
                <select
                    onChange={(e) => {
                        setSelectedCurrency(e.target.value)
                        setDisplayConversion(false)
                    }}
                >
                    {Array.from(currencies.keys()).map((item) => {
                        const currency = currencies.get(item)
                        if (!currency) {
                            return null
                        }

                        return (
                            <option
                                key={currency.code}
                                value={currency.code}
                            >{`${currency.code} - ${currency.country} ${currency.currency}`}</option>
                        )
                    })}
                </select>

                <ButtonContainer>
                    <Button onClick={() => {
                        if (!ammount) {
                            alert('Missing value in Czech Koruna to convert.')
                        }

                        setDisplayConversion(true)
                    }} type="button">Convert</Button>
                </ButtonContainer>
            </Form>

            {displayConversion && ammount && selectedCurrency && (
                <ConvertedAmount
                    korunaAmount={Number(ammount)}
                    currency={currencies.get(selectedCurrency)}
                />
            )}
        </div>
    )
}

export default Converter
