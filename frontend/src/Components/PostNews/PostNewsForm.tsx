import { FC, FormEvent, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config";
import { Auth, contextType } from "../../contexts/AuthContext";
import { Post, PostType } from "../../contexts/PostContext";
import { FILE_BASE_URL } from "../../env";
import { News } from "../../interfaces/NewsInterface";
import Error from "../Error/Error";
import "./postNews.css";
const categories: string[] = [
  "Local News",
  "News Updates",
  "Life Style",
  "Travel",
  "Obituary",
  "Live",
  "Tech",
  "Entertainment",
  "Sports",
];
const PostNewsForm: FC<{ edit?: boolean }> = ({ edit }) => {
  const { user } = useContext(Auth) as contextType;
  const { post } = useContext(Post) as PostType;
  const [tags, setTags] = useState<string[]>(
    edit ? (post?.tags as string[]) : []
  );
  const navigate = useNavigate();
  const [formData, setFormData] = useState<News>(
    edit && post
      ? post
      : {
          category: "",
          external: false,
          file: null,
          format: "",
          newsContent: "",
          place: "",
          titleEng: "",
          titleMal: "",
          type: "",
          tags,
          likes: 0,
          views: 0,
          postedAt: new Date().toLocaleDateString("en-gb"),
          userId: user?._id as string,
          author: user?.username as string,
        }
  );
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      return;
    }
    const { id, username } = JSON.parse(localStorage.getItem("user") as string);
    if (id !== "" && username !== "") {
      setFormData({ ...formData, author: username, userId: id });
    }
  }, []);

  const [img, setImg] = useState<File | null>();
  const [vid, setVid] = useState<File | null>();
  const [error, setError] = useState<string>("");
  const [tagInp, setTagInp] = useState<string>("");
  const handleChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setFormData({ ...formData, [target.name]: target.value.toLowerCase() });
  };
  const vidUpRef = useRef<HTMLInputElement>(null);
  const imgUpRef = useRef<HTMLInputElement>(null);
  const clearState = () => {
    if (img) setImg(null);
    if (vid) setVid(null);
  };
  const handleUploadVid = () => {
    clearState();
    vidUpRef.current?.click();
  };
  const handleUploadImg = () => {
    clearState();
    imgUpRef.current?.click();
  };
  const handleAddTag = (tag: string) => {
    setTagInp("");
    if (tag === " " || tag === "") return;
    setTags([...tags, tag]);
  };
  const handleDeleteTag = (id: number) => {
    setTags(
      tags.filter((tag, idx) => {
        if (idx !== id) return tag;
      })
    );
  };

  const handleFileChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    const [file] = target.files as FileList;

    if (!file) return;

    switch (target.name) {
      case "image":
        if (file.size > 5000000) {
          setError("image size is more than 5 mb");
          return;
        }
        setImg(file);
        setFormData({
          ...formData,
          type: target.name,
          file,
          format: file.type,
        });
        break;
      case "video":
        if (file.size > 500000000) {
          setError("video size is more than 500mb");
          return;
        }
        setVid(file);
        setFormData({
          ...formData,
          type: target.name,
          file,
          format: file.type,
        });
        break;
    }
    target.value = "";
  };
  const createURL = (file: File) => {
    return URL.createObjectURL(file);
  };
  const validate = () => {
    if (!formData.category) {
      setError("Please select a category");
      return false;
    }
    if (!formData.file) {
      setError("upload a video or image for the news...");
      return false;
    }
    if (tags.length < 1) {
      setError("Add some news tags");
      return false;
    }
    return true;
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setError("");
    axios
      .post(
        "/news",
        { ...formData, tags },
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        const { status, error, data } = res.data;
        switch (status) {
          case "ok":
            navigate("/editor");
            break;
          case "error":
            setError(error);
            return;
        }
      })
      .catch((err) => {
        setError("Something went wrong :( ...");
      });
  };
  const handleEdit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    axios
      .patch(
        `/news/post/${post?._id}`,
        { ...formData, tags, path: post?.file },
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        const { status, error } = res.data;
        switch (status) {
          case "ok":
            navigate("/editor");
            break;
          case "error":
            setError(error);
            break;
        }
      })
      .catch((err) => {
        setError("Something went wrong :( try again... ");
      });
  };
  return (
    <>
      <form className="row w-100 " onSubmit={edit ? handleEdit : handleSubmit}>
        <div className="col-md-6 my-2">
          <label className="form-label">
            Title of the news in Malayalam (under 200 letters)
            <span className="text-danger">*</span>
          </label>
          <input
            onChange={handleChange}
            name="titleMal"
            value={formData.titleMal}
            maxLength={200}
            type="text"
            required
            className="form-control"
          />
        </div>
        <div className="col-md-6 my-2">
          <label className="form-label">
            Title of the news in English (under 200 letters)
            <span className="text-danger">*</span>
          </label>
          <input
            onChange={handleChange}
            name="titleEng"
            value={formData.titleEng}
            maxLength={200}
            type="text"
            required
            className="form-control"
          />
        </div>
        <div className="col-md-6 my-2">
          <label className="form-label">
            Place of happenning <span className="text-danger">*</span>
          </label>
          <input
            onChange={handleChange}
            name="place"
            value={formData.place}
            maxLength={100}
            type="text"
            required
            className="form-control"
          />
        </div>
        <div className="col-md-6 my-2">
          <label className="form-label">
            News category <span className="text-danger">*</span>
          </label>
          <select
            name="category"
            className="form-select"
            onChange={handleChange}
            required
          >
            <option selected disabled>
              --Select a category--
            </option>
            {categories.map((op, idx) => {
              return (
                <option value={op} key={op + idx}>
                  {op}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-md-12 my-2">
          <label className="form-label">
            Content of the news <span className="text-danger">*</span>
          </label>
          <textarea
            onChange={handleChange}
            name="newsContent"
            style={{ resize: "none" }}
            value={formData.newsContent}
            required
            rows={10}
            className="form-control"
          ></textarea>
        </div>
        <div className="col-md-12 my-2">
          <label className="form-label">
            Upload Files (image / video) <span className="text-danger">*</span>
          </label>
          <input
            ref={vidUpRef}
            type="file"
            name="video"
            accept="video/*"
            hidden
            onChange={handleFileChange}
          />
          <input
            ref={imgUpRef}
            type="file"
            name="image"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
          <div className="d-flex algin-items-center gap-2">
            <label className="form-label">
              <input
                className="form-check-input"
                type="radio"
                name="upload"
                value={"video"}
                onClick={handleUploadVid}
              />{" "}
              video (1080p)(upload a compressed video below 500mb)
            </label>
            <label className="form-label">
              <input
                className="form-check-input"
                type="radio"
                name="upload"
                onClick={handleUploadImg}
                value={"image"}
              />{" "}
              image (1080p)(less than 5 mb)
            </label>
          </div>
        </div>
        {edit && post ? (
          <div className="col-md-12 my-2">
            <h4 style={{ textDecoration: "dotted underline var(--red-color)" }}>
              Previously uploaded file
            </h4>
            {post.type === "image" ? (
              <img
                width="300px"
                src={FILE_BASE_URL + post.file}
                alt={post.titleEng}
              />
            ) : (
              ""
            )}
            {post.type === "video" ? (
              <video
                className="video-card"
                width="300px"
                controlsList="nodownload"
                autoPlay
                muted
                loop
                controls
              >
                <source type={post.format} src={FILE_BASE_URL + post.file} />
              </video>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
        <div className="col-md-12 my-2">
          {img ? (
            <img
              width="100%"
              src={createURL(img as File)}
              alt="uploaded image"
            />
          ) : (
            ""
          )}
          {vid ? (
            <video
              className="video-card"
              width="100%"
              controlsList="nodownload"
              autoPlay
              muted
              loop
              controls
            >
              <source type={vid?.type} src={createURL(vid as File)} />
            </video>
          ) : (
            ""
          )}
        </div>
        <div className="col-md-6 my-2">
          <label className="form-label">
            News tags <span className="text-danger">*</span>
          </label>
          <div className="d-flex align-items-center gap-2">
            <input
              type="text"
              className="form-control"
              value={tagInp}
              onKeyUp={(e) => {
                const key = e.code;
                if (key === "Space" || e.key === " ") handleAddTag(tagInp);
              }}
              onChange={(e: FormEvent) => {
                const t = e.target as HTMLInputElement;
                setTagInp(t.value);
              }}
            />
            <button
              type="button"
              className="btn btn-outline-dark d-flex align-items-center justify-content-center"
            >
              <span
                onClick={() => handleAddTag(tagInp)}
                className="material-symbols-outlined"
              >
                add_circle
              </span>
            </button>
          </div>
          {tags.length > 0 ? (
            <div className="form-control my-2 p-2 d-flex align-items-center gap-2 flex-wrap">
              {tags.map((tag, idx) => {
                return (
                  <TagChip
                    key={tag + idx}
                    data={{ tag, idx }}
                    handleDelete={handleDeleteTag}
                  />
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="col-md-12 row w-100 my-4  justify-content-center">
          <button type="submit" className="btn btn-primary col-md-6 ">
            {edit ? "Edit news" : "Post News"}
          </button>
        </div>
      </form>
      {error ? <Error error={error} setError={setError} /> : ""}
    </>
  );
};
const TagChip: FC<{
  data: { tag: string; idx: number };
  handleDelete: (id: number) => void;
}> = ({ data, handleDelete }) => {
  return (
    <>
      <div className="chip d-flex align-items-center justify-content-between py-2 px-2 gap-2">
        <span>{data.tag}</span>
        <span
          onClick={() => handleDelete(data.idx)}
          className="material-symbols-outlined pointer"
        >
          cancel
        </span>
      </div>
    </>
  );
};
export default PostNewsForm;
