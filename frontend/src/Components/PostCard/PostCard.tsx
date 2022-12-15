import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShareModal from "../Modals/ShareModal";
import "./card.css";
interface Props {
  id: number;
}
const PostCard: React.FC<Props> = ({ id }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleOpenModal = () => setOpen(!open);
  return (
    <>
      <ShareModal open={open} handleOpen={handleOpenModal} />
      <div className={`card mb-1`}>
        <div className="position-relative">
          <div
            style={{ zIndex: "18" }}
            className="overlay post position-absolute start-0 end-0 top-0 bottom-0"
          ></div>
          <div
            style={{ zIndex: "19" }}
            className="w-100 d-flex mt-2 position-absolute align-items-center justify-content-between px-3"
          >
            <span
              onClick={() => setLiked(!liked)}
              className="btn- d-flex align-items-center justify-content-center"
            >
              <div className="d-flex align-items-center">
                <span
                  className={`${
                    liked ? "liked text-danger" : "text-light like"
                  } material-symbols-outlined mt-1 mx-1`}
                >
                  favorite
                </span>
                <span className="text-light">1.3K Likes</span>
              </div>
            </span>
            <div className="position-realtive">
              <span className="btn- d-flex align-items-center justify-content-center">
                <span
                  onClick={handleOpenModal}
                  className="material-symbols-outlined share text-light"
                >
                  share
                </span>
              </span>
            </div>
          </div>
          <div
            style={{ zIndex: "19" }}
            className="w-100 bottom-0 mb-2 d-flex mt-2 position-absolute align-items-center justify-content-between px-3"
          >
            <div className="d-flex gap-2 align-items-center">
              <span className="bar"></span>
              <span style={{ fontWeight: "500" }} className="text-light">
                Category
              </span>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1669802004186-31c3cf5eb4ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8Ym84alFLVGFFMFl8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            width="100%"
            height={150}
            style={{ objectFit: "cover" }}
            className="card-img-top"
            alt="post-title"
          />
        </div>
        <div className="card-body px-2 d-flex flex-column justify-content-between">
          <Link to="post" className="card-title fw-bold text-dark w-100">
            മലയാളം. പ്രത്യേക പ്രതീകങ്ങൾ ഇത് മെച്ചപ്പെടുത്താൻ
          </Link>
          <div className="d-flex align-items-center justify-content-between by-line my-1">
            <span>{new Date().toLocaleDateString()}</span>
            <span className="fw-bold">@Al techie</span>
          </div>
          <p className="card-text mt-2">
            മലയാളം. പ്രത്യേക പ്രതീകങ്ങൾ. ഇത് മെച്ചപ്പെടുത്താൻ സഹായിക്കുക! Google
            എഴുത്ത് ഉപകരണങ്ങൾ .
          </p>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-1 ">
              <span className="material-symbols-rounded eye">visibility</span>
              <span>100K views</span>
            </div>
            <div
              style={{ fontSize: "13px" }}
              onClick={() => navigate(`/post/${id}`)}
              className="btn btn-outline-danger btn-rounded"
            >
              Read more
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
