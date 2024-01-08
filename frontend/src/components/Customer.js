import ChatComponent from "./Chat";

const { Outlet } = require("react-router-dom")


const Customer = () => {
    return (
       <>
         <Outlet />
         <ChatComponent />
       </>
    )
}

export default Customer;