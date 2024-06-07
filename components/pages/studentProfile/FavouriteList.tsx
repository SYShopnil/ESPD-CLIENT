import Image from "next/image";
import backVector from "@/components/pages/logInSignUpHeader/assets/backVector.svg";
import Link from "next/link";
import React from "react";
import FavouriteItem from "@/components/pages/studentProfile/FavouriteItem";
import { useQuery } from "react-query";
import { API_GET_FAVOURITE_TUTOR } from "@/services/api/endpoints";
import { get } from "@/services/api/api";
import useUser from "@/hooks/userUser";
import { PAGE_STUDENT_DASHBOARD } from "@/config/constants";

export default function FavouriteList() {

    const { user } = useUser();
    const id = user?.id


    const { isLoading, isError, error, data: tutors, isSuccess } = useQuery({
        queryKey: ['favouriteTeacher'],
        queryFn: () => get(API_GET_FAVOURITE_TUTOR),
        enabled: !!id
    });

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12">
                        <div className="favouriteLisHead">
                            <Link href={PAGE_STUDENT_DASHBOARD}>
                                <div className="signUpBack">
                                    <Image
                                        className="backVector"
                                        src={backVector}
                                        alt=""
                                    />
                                    <p className="backText">Back to Dashboard</p>
                                </div>
                            </Link>
                            <h1>Your list of favourites</h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {tutors?.data?.map((tutor) => <div key={tutor.id} className="col-12 col-sm-12 col-md-6"> <FavouriteItem tutor={tutor} /> </div>)}

                </div>
                {!!(isSuccess && tutors?.data?.length === 0) &&
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12">
                            < div className="wellcomeWrap">
                                {/* <h1>You don't have any favorite yet!</h1> */}
                                <h1>You don't have preferred tutors yet…</h1>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </>
    )
}
