import Header from "@/components/pages/home/Header";
import Footer from "@/components/pages/home/Footer";
import Wellcome from "@/components/pages/studentProfile/Wellcome";
import LessonsDetails from "@/components/pages/studentProfile/LessonsDetails";
import FavouriteList from "@/components/pages/studentProfile/FavouriteList";
import Profile from "@/components/pages/studentProfile/Profile";
// import LoggedOut from "@/components/pages/studentProfile/LoggedOut";
import useUser from "@/hooks/userUser";
import { useRouter } from "next/navigation";
import { PAGE_LOGIN } from "@/config/constants";
import { useEffect } from "react";



export default function DashboardLayout({children}) {

	const router = useRouter()
	const { user } = useUser();
	console.log(user);

	if (user === undefined) return null;
	if (user && user.access_token === undefined) {

		console.log(user);
		//TODO conditonaly redirect to dashbiard based on role
		router.replace(PAGE_LOGIN)
	}

	return (
		<>
			<div className="mainWrapperSet">
				<Header />

				<div className="studentProfileWrapper">
					{children}
				</div>
				<Footer />
			</div>
		</>
	);
}
