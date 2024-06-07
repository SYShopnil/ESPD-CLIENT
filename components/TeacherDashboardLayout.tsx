import Header from "@/components/pages/home/Header";
import Footer from "@/components/pages/home/Footer";
import useUser from "@/hooks/userUser";
import {useRouter} from "next/navigation";
import {PAGE_LOGIN, ROLE_TEACHER} from "@/config/constants";


export default function StudentDashboardLayout({children}) {

	const router = useRouter()
	const { user } = useUser();

	if (user === undefined) return null;
	if (user && user.access_token === undefined) {
		router.replace(PAGE_LOGIN)
	}
	if (user && user.role !== ROLE_TEACHER) {
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
