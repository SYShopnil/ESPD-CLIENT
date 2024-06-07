import Image from "next/image";
import React, { useState } from "react";
import MagnifyingGlass from "@/components/pages/home/assets/MagnifyingGlass.svg";
import ArrowRight from "@/components/pages/search/assets/ArrowRightww.svg";
import Link from "next/link";
import SearchItem from "@/components/pages/search-result/SearchItem";
import FindTutorShort from "@/components/pages/search-result/FindTutorShort";
import ArrowRightWhite from "@/components/pages/search/assets/ArrowRightWhite.svg";
import { useQuery } from "react-query";
import { get } from "@/services/api/api";
import { API_GET_ALL_TUTOR, API_GET_HOME } from "@/services/api/endpoints";
import SearchPagination from "./SearchPagination";
import { useRouter } from "next/router";
import Select from 'react-select'
import { PAGE_SEARCH_RESULT } from "@/config/constants";


export default function BeforeSearch() {
	const [page, setPage] = useState(0)
	const router = useRouter();
	const {subject_id, subject_name,student_level} = router.query;
	const searchResultUrl = Object.keys(router.query).length !== 0 ?
		`${PAGE_SEARCH_RESULT}?subject_id=${subject_id}&subject_name=${subject_name}&student_level=${student_level}`
		: `${PAGE_SEARCH_RESULT}`;


	let queryParam = {
		page
	}

	const queryStr = new URLSearchParams(queryParam).toString();

	const { isLoading, isError, error, data: tutors } = useQuery({
		queryKey: ['allTutorsData', page],
		queryFn: () => get(`${API_GET_ALL_TUTOR}?page=${page}`),

	});

	// GET subject and level

	const { isLoading: isHomeLoading, isError: isHomeError, error: homeError, data: homeData } = useQuery({
		queryKey: ['homeData'],
		queryFn: () => get(API_GET_HOME)
	});

	const subject_options = homeData?.data?.subjects?.map(subject => ({ value: subject?.id, label: subject?.name }))

	const level_options = homeData?.data?.levels?.map(level => ({ value: level?.id, label: level?.name }))


	const handleSetQueryParam = (queryString, value) => {

		let updatedQuery = {
			...router.query
		};

		if (queryString === 'subject_id') {

			if (!value) {
				delete updatedQuery[queryString]
			} else {
				updatedQuery[queryString] = value?.value;
				updatedQuery["subject_name"] = value?.label;
			}

		} else if (queryString === 'student_level') {

			if (!value) {
				delete updatedQuery[queryString]
			} else {
				updatedQuery[queryString] = value?.value;
			}

		}
		else {
			updatedQuery[queryString] = value;
		}

		router.push({
			pathname: router.pathname,
			// pathname: PAGE_SEARCH_RESULT,
			query: updatedQuery,
		}, undefined, { scroll: false });

	}


	return (
		<>
			<div className="container beforeSearchWrapper">
				<div className="row">
					<div className="col-12 col-sm-12 col-md-6">
						<div className="BeforeSearchHead">
							<h1>Meet Your Expert Teachers</h1>
							<p>Highly Qualified & Experienced Instructors Ready to Guide You</p>
						</div>
						<div className="searchBox searchPageSelectWrap">
							<div className="searchInnerBox">
								<div className="levelCon custom-select">
									<Select
										classNamePrefix="espd-select"
										isSearchable
										options={subject_options}
										onChange={(value) => handleSetQueryParam("subject_id", value)}
										menuPlacement="top"
										placeholder="Enter your Subject"
									/>

								</div>
								<div className="levelCon custom-select outBorderRadius">
									<Select
										classNamePrefix="espd-select"
										isSearchable
										options={level_options}
										onChange={(value) => handleSetQueryParam("student_level", value)}
										menuPlacement="top"
										placeholder="Select Level"
									/>

								</div>
							</div>

							<div className="searchBtnBox">
								<Link href={searchResultUrl} className="searchBtnSet">
									<Image
										className="MagnifyingGlass"
										src={MagnifyingGlass}
										alt=""
									/>
									<p className="levelText">Search</p>
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="row searchConRow">
					<div className="col-12 col-sm-12 col-md-8 ">
						<div className="BeforeSearchWrap">
							<h1>{tutors?.data?.meta?.total} Teachers Available</h1>
							{
								tutors?.data?.data?.length && tutors?.data?.data?.map((tutor) => <SearchItem
									key={tutor.id}
									tutor={tutor}
									favTeachers={tutors?.data?.fav_teachers}
								/>)
							}


							{/*pagination*/}
							<SearchPagination
								currentPage={tutors?.data?.meta?.currentPage}
								lastPage={tutors?.data?.meta?.lastPage}
								onClickPage={index => setPage(index)}
							/>
							{/* <div className="pasinationBox">
								<nav aria-label="Page navigation example">
									<ul className="pagination">
										<li className="page-item"><Link className="page-link" href="#">1</Link></li>
										<li className="page-item"><Link className="page-link" href="#">2</Link></li>
										<li className="page-item"><Link className="page-link" href="#">3</Link></li>
										<li className="page-item"><Link className="page-link nextImgDouble" href="#">
											Next
											<Image
												className="ArrowRightPasi"
												src={ArrowRight}
												alt=""
											/>
											<Image
												className="ArrowRightWhite "
												src={ArrowRightWhite}
												alt=""
											/>
										</Link></li>
									</ul>
								</nav>
							</div> */}
						</div>

					</div>
					<div className="col-12 col-sm-12 col-md-4 ">
						<div className="searchRequireHelp">
							<FindTutorShort />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
