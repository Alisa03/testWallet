import { parseEther } from "ethers"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { useConnect, usePrepareSendTransaction, useSendTransaction, useWaitForTransaction } from "wagmi"
import History from "./History"

export default function Transaction() {
    const [error, setError] = useState(false)

    const { connect, connectors, pendingConnector } = useConnect()

    // адрес кому
    const [to, setTo] = useState('')
    const [debouncedTo] = useDebounce(to, 500)

    // сумма 
    const [amount, setAmount] = useState('')
    const [debouncedAmount] = useDebounce(amount, 500)

    // подготовка транзакции
    const { config, isError } = usePrepareSendTransaction({
        to: debouncedTo,
        value: (debouncedAmount && !isNaN(Number(debouncedAmount))) ? parseEther(debouncedAmount) : undefined,
    })

    useEffect(() => {
        setError(isNaN(Number(debouncedAmount)))
    }, [debouncedAmount])


    // транзакция и данные 
    const { data, sendTransaction } = useSendTransaction(config)

    // загрузка и успешно ли
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
                {/* адрес */}
                <label className='from__label'>Recipient</label>
                <input
                    aria-label="Recipient"
                    placeholder="0xA0Cf…251e"
                    onChange={(e) => setTo(e.target.value)}
                    value={to}
                    className={isError ? 'form__input _error' : 'form__input'}
                />
                {/* сумма */}
                <label className='from__label'>Amount (ether)</label>
                <input
                    aria-label="Amount (ether)"
                    placeholder="0.05"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    className={error ? 'form__input _error' : 'form__input'}
                />
                <button className="btn" disabled={!to || !amount || error || isError || !connect}>{isLoading ? 'Loading...' : 'Send'}</button>
            </form>
            <p>{isSuccess && 'Successfully sent'}</p>
            <p>{isError && 'Error: data entered incorrectly'}</p>
            {/* история транзакций */}
            <History hash={data?.hash} />
        </main>
    )
}
