import React from 'react'

import { Currency } from "../types"

interface Props {
    currency: Currency | undefined;
    korunaAmount: number | null;
}

function ConvertedAmount({currency, korunaAmount}: Props) {
    if (korunaAmount == null || currency == null) {
        return null
    }

    const convertedAmount = (korunaAmount * currency?.amount) / currency?.rate

    return (
        <div style={{textAlign: 'center'}}>
            {`${convertedAmount.toLocaleString()} ${currency.code}`}
        </div>
    )
}

export default ConvertedAmount
