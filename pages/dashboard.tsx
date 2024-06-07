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
import DashboardLayout from "@/components/DashboardLayout";
import Wellcome from "@/components/pages/studentProfile/Wellcome";

export default function Search() {

	return (
		<DashboardLayout>
			<Wellcome />
		</DashboardLayout>
	);
}
