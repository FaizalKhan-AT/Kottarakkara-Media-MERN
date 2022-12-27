import React from "react";
import { Helmet } from "react-helmet";
import { FILE_BASE_URL, FRONTEND_BASE_URL } from "../../env";
import { News } from "../../interfaces/NewsInterface";
const PostSeo: React.FC<{ post: News }> = ({ post }) => {
  return (
    <>
      <Helmet>
        <meta name="author" content={post?.author} />
        <meta name="robots" content="noindex, follow" />
        {window.location.href.includes("/post") ? (
          <title>{post?.titleMal + "| kottarakara media"} </title>
        ) : (
          ""
        )}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post?.titleMal} />
        <meta property="og:description" content={post?.newsContent} />
        <meta
          property="og:url"
          content={`${FRONTEND_BASE_URL}/post/${post?._id}`}
        />
        <meta property="article:published_time" content={post?.postedAt}></meta>
        <meta property="og:image" content={FILE_BASE_URL + post?.file} />
        <meta property="og:image:type" content={post?.format} />{" "}
        <meta property="og:video" content={FILE_BASE_URL + post?.file} />
        <meta property="og:video:type" content={post?.format} />{" "}
      </Helmet>
    </>
  );
};

export default PostSeo;
