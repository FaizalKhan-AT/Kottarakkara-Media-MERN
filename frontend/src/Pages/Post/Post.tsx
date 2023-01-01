import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { domainToUnicode } from "url";
import CategorySection from "../../Components/CategorySection/CategorySection";
import Error from "../../Components/Error/Error";
import Footer from "../../Components/Footer/Footer";
import PostView from "../../Components/PostView/PostView";
import PostSeo from "../../Components/Seo/PostSeo";
import axios from "../../config";
import { FILE_BASE_URL, FRONTEND_BASE_URL } from "../../env";
import { News } from "../../interfaces/NewsInterface";

const Post: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<News>();
  const [error, setError] = useState<string>("");
  const [relatedNews, setRelatedNews] = useState<News[]>([]);
  const refreshHead = () => {
    const title = document.querySelector("title") as HTMLTitleElement;
    const metaDesc = document.querySelector(
      "meta[name=description]"
    ) as HTMLMetaElement;
    const metaOgDesc = document.querySelector(
      "meta[property='og:description']"
    ) as HTMLMetaElement;
    const metaOgTitle = document.querySelector(
      "meta[property='og:title']"
    ) as HTMLMetaElement;
    const metaOgFile = document.querySelector(
      `meta[property='og:${post?.type}']`
    ) as HTMLMetaElement;
    const metaOgUrl = document.querySelector(
      "meta[property='og:url']"
    ) as HTMLMetaElement;
    const metaOgFileType = document.querySelector(
      `meta[property='og:${post?.type}:type']`
    ) as HTMLMetaElement;
    const metaOgType = document.querySelector(
      "meta[property='og:type']"
    ) as HTMLMetaElement;
    const metaAuthor = document.querySelector(
      "meta[name=author]"
    ) as HTMLMetaElement;
    const metaPublished = document.querySelector(
      "meta[property='article:published_time']"
    ) as HTMLMetaElement;
    const metaKeywords = document.querySelector("meta[name=keywords]");
    metaAuthor.setAttribute("content", post?.author as string);
    metaPublished.setAttribute("content", post?.postedAt as string);
    metaDesc.setAttribute("content", post?.newsContent as string);
    title.innerText = post?.titleMal as string;
    metaOgDesc.setAttribute("content", post?.newsContent as string);
    metaOgTitle.setAttribute("content", post?.titleEng as string);
    metaOgFile.setAttribute("content", (FILE_BASE_URL + post?.file) as string);
    metaOgFileType.setAttribute("content", post?.format as string);
    metaOgUrl.setAttribute(
      "content",
      FRONTEND_BASE_URL +
        "/" +
        post?.category +
        "/" +
        post?.titleEng.replaceAll(" ", "-") +
        "/" +
        post?._id
    );
    metaOgType.setAttribute("content", "article");
  };
  useEffect(() => {
    if (post) refreshHead();
  }, [post]);
  const fetchRelatedNews = (category: string, id: string) => {
    axios
      .get(`/news/related/${category}/${id}`)
      .then((res) => {
        const { status, error, data } = res.data;
        switch (status) {
          case "ok":
            setRelatedNews(data);
            break;
          case "error":
            setError(error);
            break;
        }
      })
      .catch((err) => {
        setError("Something went wrong :( try refreshing the page");
      });
  };
  const fetchPost = () => {
    axios
      .get(`/news/post/${id}`)
      .then((res) => {
        const { status, error, data } = res.data;
        switch (status) {
          case "ok":
            setPost(data);
            fetchRelatedNews(data.category.replace(" ", "-"), data._id);
            break;
          case "error":
            setError(error);
        }
      })
      .catch((err) => {
        setError("Something went wrong :( try again");
      });
  };
  useEffect(() => {
    fetchPost();
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      {/* <PostSeo post={post as News} /> */}
      {error ? <Error error={error} setError={setError} /> : ""}
      <PostView post={post ? post : null} />
      <br />
      <br />
      <div className="container w-100">
        <CategorySection
          relatedNews={relatedNews}
          name="Related Articles"
          related
        />
      </div>
      <br />
      <Footer />
    </>
  );
};

export default Post;
