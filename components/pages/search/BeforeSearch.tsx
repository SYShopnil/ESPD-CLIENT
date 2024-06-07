import Image from "next/image";
import React, {useState} from "react";
import MagnifyingGlass from "@/components/pages/home/assets/MagnifyingGlass.svg";
import ArrowRight from "@/components/pages/search/assets/ArrowRightww.svg";
import Link from "next/link";
import SearchItem from "@/components/pages/search/SearchItem";
import FindTutorShort from "@/components/pages/search/FindTutorShort";
import ArrowRightWhite from "@/components/pages/search/assets/ArrowRightWhite.svg";
import { useQuery } from "react-query";
import { get } from "@/services/api/api";
import { API_GET_ALL_TUTOR } from "@/services/api/endpoints";
import Select from "react-select";
import {useRouter} from "next/router";

export default function BeforeSearch() {

	const { isLoading, isError, error, data: tutors } = useQuery({ queryKey: ['tutorsData'], queryFn: () => get(API_GET_ALL_TUTOR) });
	console.log(tutors);

	
	return (
		<>
			<div className="container beforeSearchWrapper">
				<div className="row">
					<div className="col-12 col-sm-12 col-md-6">
						<div className="BeforeSearchHead">
							<h1>Meet Your Expert Teachers</h1>
							<p>Highly Qualified & Experienced Instructors Ready to Guide You</p>
						</div>
						<div className="searchPageSelectWrap">
							<div className="searchBox">
								<div className="searchInnerBox">
									<div className="levelCon custom-select">
										<Select
											classNamePrefix="espd-select"
											isSearchable
											// options={subject_options}
											// onChange={(value) => handleSetQueryParam("subject_id", value)}
											menuPlacement="top"
											placeholder="Enter your Subject"
										/>
									</div>
									<div className="levelCon custom-select outBorderRadius">
										<Select
											classNamePrefix="espd-select"
											isSearchable
											// options={level_options}
											// onChange={(value) => handleSetQueryParam("student_level", value)}
											menuPlacement="top"
											placeholder="Select Level"
										/>
									</div>
								</div>
								<div className="searchBtnBox">
									<Link href="/search" className="searchBtnSet">
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
				</div>
				<div className="row searchConRow">
					<div className="col-12 col-sm-12 col-md-8 ">
						<h1 className="teacherAvailblH1">{tutors?.length} Teachers Available</h1>
						<div className="BeforeSearchWrap">
							<h1>{tutors?.length} Teachers Available</h1>
							{
								tutors?.length && tutors.map((tutor) => <SearchItem key={tutor.id} tutor={tutor} />)
							}

							{/*pagination*/}
							<div className="pasinationBox">
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
							</div>
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
