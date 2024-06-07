import React from "react";
import Header from "@/components/pages/home/Header";
import Footer from "@/components/pages/home/Footer";

import {
    FacebookShareButton,
    FacebookIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    WhatsappShareButton,
    WhatsappIcon,
    EmailShareButton,
    EmailIcon,
} from 'next-share'

export default function Test() {

    const url = "https://fast.com/"
    console.log(url);

    return (
        <>
            <div className="searchWrapperSet">
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="backHomeBox">
                                <div style={{display:'flex' , }} className="getLinkBox">
                                    <FacebookShareButton
                                        url={url}>
                                        <FacebookIcon size={48} round />
                                    </FacebookShareButton>

                                    <FacebookMessengerShareButton
                                        url={'https://github.com/next-share'}
                                        appId={'asaduzzaman.sunam'}
                                    >
                                        <FacebookMessengerIcon size={48} round />
                                    </FacebookMessengerShareButton>

                                    <WhatsappShareButton
                                        url={'https://github.com/next-share'}
                                        title={'next-share is a social share buttons for your next React apps.'}
                                        separator=":: "
                                    >
                                        <WhatsappIcon size={48} round />
                                    </WhatsappShareButton>

                                    <EmailShareButton
                                        url={url}
                                        subject={"ESPD - The world is our classroom "}
                                        body="Join ESPD today"
                                        blankTarget={true}
                                    >
                                        <EmailIcon size={48} round />
                                    </EmailShareButton>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <BeforeSearch /> */}
                <Footer subjects={[]} />
            </div>
        </>
    );
}