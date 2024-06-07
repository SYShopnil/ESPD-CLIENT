import Header from "@/components/pages/home/Header";
import Footer from "@/components/pages/home/Footer";
import useUser from "@/hooks/userUser";
import JoiningGroup from "@/components/pages/JoiningGroup";

export default function JoinGroup() {
    const { user } = useUser();
    return (
        <>
            <div className="mainWrapperSet">
                <Header user={user} />

                <div className="studentProfileWrapper">
                    <JoiningGroup />
                </div>
                <Footer />
            </div>
        </>
    );
}
