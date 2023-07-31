import { useEffect, useState } from "react"
import { parseEther } from "ethers"
import { useDebounce } from "use-debounce"
import { useAccount, usePrepareSendTransaction, useSendTransaction, useWaitForTransaction } from "wagmi"

import History from "./History"

export default function Transaction() {
    const { connector: activeConnector, isConnected } = useAccount()

    // to 
    const [to, setTo] = useState('')
    const [debouncedTo] = useDebounce(to, 500)

    // value
    const [amount, setAmount] = useState('')
    const [debouncedAmount] = useDebounce(amount, 500)
    const [errorAmount, setErrorAmount] = useState(false)

    // Transaction
    const { config, isError } = usePrepareSendTransaction({
        to: debouncedTo,
        value: (debouncedAmount && !isNaN(Number(debouncedAmount))) ? parseEther(debouncedAmount) : undefined,
    })

    // error amount
    useEffect(() => {
        setErrorAmount(isNaN(Number(debouncedAmount)))
    }, [debouncedAmount])

    const { data, sendTransaction } = useSendTransaction(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    return (
        <main className="main">
            <form
                className="form"
                onSubmit={(e) => {
                    e.preventDefault()
                    sendTransaction?.()
                    setTo('')
                    setAmount('')
                }}>
                <label className='from__label'>Recipient</label>
                <input
                    aria-label="Recipient"
                    placeholder="0xA0Cf…251e"
                    onChange={(e) => setTo(e.target.value)}
                    value={to}
                    className={isError ? 'form__input _error' : 'form__input'}
                />
                <label className='from__label'>Amount (ether)</label>
                <input
                    aria-label="Amount (ether)"
                    placeholder="0.05"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    className={errorAmount || isError ? 'form__input _error' : 'form__input'}
                />
                <button className="btn" disabled={!to || !amount || errorAmount || isError || !isConnected}>{isLoading ? 'Loading...' : 'Send'}</button>
            </form>

            <p>{isSuccess && 'Successfully sent'}</p>
            <p>{isError && 'Error: Wrong input data or insufficient funds'}</p>

            <History hash={data?.hash} />
        </main>
    )
}
