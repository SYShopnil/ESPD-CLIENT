import Header from "@/components/pages/home/Header";
import Footer from "@/components/pages/home/Footer";
import useUser from "@/hooks/userUser";
import { useRouter } from "next/navigation";
import { PAGE_LOGIN, ROLE_STUDENT } from "@/config/constants";
import { useQuery } from "react-query";
import { get } from "@/services/api/api";
import { API_GET_HOME } from "@/services/api/endpoints";


export default function StudentDashboardLayout({ children }) {


	const { isLoading, isError, error, data } = useQuery({
		queryKey: ['homeData', 'student-dashboard'],
		queryFn: () => get(API_GET_HOME)
	});

	const router = useRouter()
	const { user } = useUser();

	if (user === undefined) return null;
	if (user && user.access_token === undefined) {
		router.replace(PAGE_LOGIN)
	}
	if (user && user.role !== ROLE_STUDENT) {
		router.replace(PAGE_LOGIN)
	}


	return (
		<>
			<div className="mainWrapperSet">
				<Header />

				<div className="studentProfileWrapper">
					{children}
				</div>
				<Footer subjects={data?.data?.subjects} setting={data?.data?.setting} />
			</div>
		</>
	);
}
