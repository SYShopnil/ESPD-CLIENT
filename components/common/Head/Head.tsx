import React, { ReactNode } from "react";
import Head from "next/head";
import { BASE_URL } from "../../../config/config";
import {
	metaDesc,
	metaKeywords,
	metaSiteTitle,
} from "../../../config/defaultMetaConfig";

interface CustomHeadProps {
	title?: string;
	metaTitle?: string;
	description?: string;
	keywords?: string;
	author?: string;
	url?: string;
	type?: string;
	image?: string;
	children?: ReactNode;
}

export const CustomHead = ({
	title = "",
	metaTitle = "",
	description = "",
	keywords = "",
	author = "",
	url = "",
	type = "",
	image = "",
	children,
}: any) => {
	title = title ? title : metaSiteTitle;
	metaTitle = metaTitle ? metaTitle : metaSiteTitle;
	description = description ? description : metaDesc;
	keywords = keywords ? keywords : metaKeywords;
	author = author ? author : "On Party";
	url = url ? url : BASE_URL;
	type = type || "website";
	image = image || BASE_URL + "/logo.png";

	return (
		<Head>
			<meta charSet="utf-8" />
			<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />

			<title>{title}</title>
			<meta name="title" key="title" content={metaTitle} />
			<meta name="description" key="description" content={description} />
			<meta name="keywords" key="keywords" content={keywords} />
			<meta name="author" key="author" content={author} />
			<meta name="url" key="url" content={url} />
			<meta property="og:locale" content="en_US" key="og:locale" />
			<meta
				property="og:site_name"
				content={metaSiteTitle}
				key="og:site_name"
			/>
			<meta property="og:url" key="og:url" content={url} />
			<meta property="og:type" key="og:type" content={type} />
			<meta property="og:title" key="og:title" content={metaTitle} />
			<meta
				property="og:description"
				key="og:description"
				content={description}
			/>
			<meta property="og:image" key="og:image" content={image} />
			<meta property="og:image:url" key="og:image:url" content={image} />
			<meta
				property="og:image:secure_url"
				key="og:image:secure_url"
				content={image}
			/>
			<meta property="og:image:alt" key="og:image:alt" content={metaTitle} />
			<meta property="article:publisher" content="" key="article:publisher" />
			<meta
				name="twitter:card"
				key="twitter:card"
				content="summary_large_image"
			></meta>
			<meta name="twitter:creator" content="@OnParty" key="twitter:creator" />
			<meta name="twitter:site" content="@OnParty" key="twitter:site" />
			<meta name="twitter:label1" content="Est. reading time" />
			<meta name="twitter:data1" content="6 minutes" />

			<link rel="canonical" href={url} />

			{children}
		</Head>
	);
};
