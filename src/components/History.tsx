import { useEffect, useState } from 'react'
import { useTransaction } from 'wagmi'
import '../styles/History.scss'

export default function History({ hash }: any) {
    const [tx, setTx] = useState<any[]>([])

    const { data, isError, isLoading } = useTransaction({
        hash: hash,
    })

    useEffect(() => {
        const ifHash = tx.at(-1)?.hash !== data?.hash

        if (data && ifHash) setTx([...tx, data])

    }, [data])

    if (tx.length === 0) return <h3>No transaction</h3>

    return (
        <div className='block'>
            <table className="table">
                <thead className='thead'>
                    <tr className='row'>

                        <th className="col">Hash</th>
                        <th className="col">From</th>
                        <th className="col">To</th>
                        <th className="col">Value</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        tx &&
                        tx.map((item: any) =>
                            <tr className='row' key={item.id}>
                                {/* hash */}
                                <th className="col">
                                    <div className="">
                                        <a href={`https://etherscan.io/tx/${item.hash}`} className="">
                                            {item.hash.slice(0, 20)}...
                                        </a>
                                    </div>
                                </th>
                                {/* from */}
                                <th className="col">
                                    <div className="col_flex">
                                        <span>
                                            {item.from.slice(0, 10)}...{item.from.slice(-10)}
                                        </span>
                                        <button onClick={() => { navigator.clipboard.writeText(item.from) }}><img src='/copy.svg' alt="copy" /></button>
                                    </div>
                                </th>
                                {/* to */}
                                <th className="col">
                                    <div className="col_flex">
                                        <a href={item.to}>
                                            {item.to.slice(0, 10)}...{item.to.slice(-10)}
                                        </a>
                                        <button onClick={() => { navigator.clipboard.writeText(item.to) }}><img src='/copy.svg' alt="copy" /></button>
                                    </div>
                                </th>
                                {/* value */}
                                <th className="col">
                                    <span>
                                        {String(Number(item.value) / 10 ** 18).slice(0, 10)} ETH
                                    </span>
                                </th>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
