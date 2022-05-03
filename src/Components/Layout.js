import Head from "next/head"
import {Navbarr} from "./Navbarr"

export const Layout = ({children}) => (
    <>
    <Head>
        <title>Task App</title>
    </Head>
    <Navbarr />
    {children}
    </>
)