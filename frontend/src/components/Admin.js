import ChatComponent from "./Chat";

const { Outlet } = require("react-router-dom")


const Admin = () => {
    return (
        <>
            <Outlet />
            <ChatComponent />
        </>
    )
}

export default Admin;