import { Outlet } from "react-router"
import NewPost from "./feed/components/NewPost";

const RootLayout = () => {
    return <>
    <Outlet/>
    </>
}


export default RootLayout;