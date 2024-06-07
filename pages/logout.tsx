import Header from "@/components/pages/home/Header";
import Footer from "@/components/pages/home/Footer";
import Wellcome from "@/components/pages/studentProfile/Wellcome";
import LessonsDetails from "@/components/pages/studentProfile/LessonsDetails";
import FavouriteList from "@/components/pages/studentProfile/FavouriteList";
import Profile from "@/components/pages/studentProfile/Profile";
import LoggedOut from "@/components/pages/studentProfile/LoggedOut";

import useUser from "@/hooks/userUser";
import { useRouter } from "next/navigation";

export default function Logout() {

    const { user } = useUser();

    return (
        <>
            <div className="mainWrapperSet">
                <Header user={user} />

                <div className="studentProfileWrapper">
                    <LoggedOut />
                </div>
                <Footer />
            </div>
        </>
    );
}