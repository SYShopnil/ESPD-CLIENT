import TeacherHeader from "@/components/pages/teacherProfile/TeacherHeader";
import TeacherDashboard from "@/components/pages/teacherProfile/TeacherDashboard";
import TeacherFooter from "@/components/pages/teacherProfile/TeacherFooter";
import ProfileSettings from "@/components/pages/teacherProfile/ProfileSettings";

export default function TeacherProfile() {
    return (
        <>
            <div className="teacherProfileWrapper">
                <TeacherHeader />

                <div className="profileAccountWrapper">
                    <ProfileSettings />
                </div>

                <TeacherFooter />
            </div>
        </>
    )
}
