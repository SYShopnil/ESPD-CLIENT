import React from "react";
import LogInFrom from "@/components/pages/logIn/LogInFrom";
import Header from "@/components/pages/home/Header";
import Footer from "@/components/pages/home/Footer";
import BeforeSearch from "@/components/pages/search-result/BeforeSearch";
import AfterSearch from "@/components/pages/search-result/AfterSearch";
import StillRequire from "@/components/pages/BookingOption/StillRequire";
import Image from "next/image";
import backVector from "@/components/pages/logInSignUpHeader/assets/backVector.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import useUser from "@/hooks/userUser";
import { PAGE_LOGIN, ROLE_STUDENT } from "@/config/constants";
import {useQuery} from "react-query";
import {get} from "@/services/api/api";
import {API_GET_HOME} from "@/services/api/endpoints";
export default function Search() {
	return (
		<>
			<div className="searchWrapperSet">
				<Header />
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="backHomeBox">
								<Link href="/">
									<div className="signUpBack">
										<Image
											className="backVector"
											src={backVector}
											alt=""
										/>
										<p className="backText">Back</p>
									</div>
								</Link>
							</div>
						</div>
					</div>
				</div>
				<BeforeSearch />
				<Footer subjects={[]} />
			</div>
		</>
	);
}
