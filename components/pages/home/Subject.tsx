import { PAGE_SEARCH_RESULT } from "@/config/constants";
import { useRouter } from "next/router";

export default function Subject({ subjects }) {
  const router = useRouter();

  const popularSubjects = subjects?.filter((subject) => subject.is_popular);

  return (
    <>
      <div className="container subjectWrapper">
        <div className="row subjectRow">
          <div className="col-12">
            <h2>Our Student-favorite Subjects</h2>
            <div className="subjectWrap">
              {popularSubjects?.map((subject) => (
                <a
                  href={`${PAGE_SEARCH_RESULT}?subject_name=${subject?.name}&subject_id=${subject?.id}`}
                  key={subject.id}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(
                      `${PAGE_SEARCH_RESULT}?subject_name=${subject?.name}&subject_id=${subject?.id}`
                    );
                  }}
                  className="subBox"
                >
                  <p>{subject.name}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
