import {Outlet} from "react-router-dom";
import {Fragment} from "react";
import GoogleCalendar from "./components/calendarLogic/GoogleCalendar.tsx";
import CusotmFooter from "./components/CusotmFooter.tsx";

const HomeLayout = () => {
    return (
        <Fragment>
            <GoogleCalendar />
            <CusotmFooter/>
            <Outlet/>
        </Fragment>
    );
};

export default HomeLayout;
