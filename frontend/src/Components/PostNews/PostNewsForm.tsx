import { FC, FormEvent, useRef, useState } from "react";
import "./postNews.css";
const categories: string[] = [
  "Local News",
  "News Updates",
  "Life Style",
  "Travel",
  "Obituary",
  "Live",
  "Tech",
  "Sports",
];
const PostNewsForm: FC = () => {
  const [formData, setFormData] = useState<any>({});
  const [img, setImg] = useState<File | null>();
  const [vid, setVid] = useState<File | null>();
  const [error, setError] = useState<string>("");
  const [tagInp, setTagInp] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const handleChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setFormData({ ...formData, [target.name]: target.value });
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
        setFormData({ ...formData, type: target.name });
        break;
      case "video":
        setVid(file);
        setFormData({ ...formData, type: target.name });
        break;
    }
    target.value = "";
  };
  const createURL = (file: File) => {
    return URL.createObjectURL(file);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      <form className="row w-100 " onSubmit={handleSubmit}>
        <div className="col-md-6 my-2">
          <label className="form-label">
            Title of the news in Malayalam (under 200 letters)
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
          <label className="form-label">Place of happenning</label>
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
          <label className="form-label">News category</label>
          <select
            name="category"
            className="form-select"
            onChange={handleChange}
            required
          >
            <option disabled>--Select a category--</option>
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
          <label className="form-label">Content of the news</label>
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
          <label className="form-label">Upload Files (image / video)</label>
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
              video (1080p)(upload a compressed video)
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
        <div className="col-md-12 my-2">
          {img ? (
            <img width="100%" src={createURL(img)} alt="uploaded image" />
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
              <source type={vid.type} src={createURL(vid)} />
            </video>
          ) : (
            ""
          )}
        </div>
        <div className="col-md-6 my-2">
          <label className="form-label">Video tags</label>
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
        <div className="col-md-12 row w-100 my-4 justify-content-center">
          <button type="submit" className="btn btn-primary col-md-6">
            Post News
          </button>
        </div>
      </form>
      {error ? (
        <div className="alert alert-danger mt-2 position-relative" role="alert">
          <button
            onClick={() => setError("")}
            type="button"
            className="btn-close position-absolute end-0 top-0 mt-1 me-2"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
          <span className="py-2">{error}</span>
        </div>
      ) : (
        ""
      )}
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
