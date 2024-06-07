import LessonsDetails from "@/components/pages/studentProfile/LessonsDetails";
import Wellcome from "@/components/pages/studentProfile/Wellcome";
import StudentDashboardLayout from "@/components/StudentDashboardLayout";


export default function Index() {

	return (
		<StudentDashboardLayout>
			{/* <Wellcome /> */}
			<LessonsDetails />
		</StudentDashboardLayout>
	);
}
