import { Web3Button } from "@web3modal/react";
import { useAccount, useBalance } from "wagmi";

export default function Navbar() {
    const { address } = useAccount()
    const { data, isError, isLoading } = useBalance({
        address: address
    })

    return (
        <header className="header">
            <div className="header__container">
                <img src="/Ethereum.svg" alt="Ethereum" className="logo" />

                <ul className="nav">
                    <li>
                        <p style={{ color: '#7EC9C5' }}>{isLoading ? 'Loading...' : data && 'Balance:'}</p>
                        {data && `${data?.formatted.slice(0, 10)}... ${data?.symbol}`}
                    </li>
                    <li>
                        <Web3Button />
                    </li>
                </ul>
            </div>
        </header>
    )
}