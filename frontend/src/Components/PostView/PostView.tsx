import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ShareModal from "../Modals/ShareModal";
import ImageElement from "./ImageElement";
import "./postView.css";
import VideoElement from "./VideoElement";
type Props = {
  data: number;
};
const PostView: React.FC = () => {
  const { vid } = useParams();

  return (
    <>
      {vid === "true" ? <VideoElement /> : <ImageElement />}
      <div className="my-3 container">
        <h3 className="fw-bold my-3 mb-4 w-100">
          മലയാളം പ്രത്യേക പ്രതീകങ്ങൾ ഇത് മെച്ചപ്പെടുത്താൻ സഹായിക്കുക! Google
          എഴുത്ത് ഉപകരണങ്ങൾ .
        </h3>
        <div
          style={{ width: "80%" }}
          className="d-flex align-items-center fs-5 justify-content-between"
        >
          <span className="d-flex align-items-center gap-2 fw-bold">
            <span className="material-symbols-outlined red-color fs-2">
              calendar_month
            </span>
            <span className="byline-underline">
              {new Date().toLocaleDateString()}
            </span>
          </span>
          <span className="fw-bold d-flex align-items-center gap-2 ">
            <span className="material-symbols-outlined fs-2 red-color">
              account_circle
            </span>
            <span className="byline-underline">Al techie</span>
          </span>
        </div>
        <div style={{ fontSize: "18px" }} className="my-3">
          <span className="fw-bold"> Kollam &#x2726; </span>
          <span className="red-color fw-bold fs-3">L</span>orem ipsum dolor sit
          amet, consectetur adipisicing elit. Illo beatae modi, repudiandae, aut
          amet maiores, iste voluptatibus consequuntur non laborum blanditiis
          ipsum debitis in labore neque molestiae tenetur fugiat ratione nulla
          harum accusamus. Impedit culpa, maiores hic, enim unde quod at
          corporis error ut, vel repellendus! Quas sunt adipisci dicta. Lorem
          ipsum dolor, sit amet consectetur adipisicing elit. Tempore
          consectetur eveniet id commodi expedita veniam doloribus eaque,
          perspiciatis dignissimos repellat soluta minus beatae nesciunt, atque
          ipsam unde distinctio officia voluptas praesentium rerum provident
          voluptatibus modi? Quibusdam sapiente, ut dignissimos incidunt
          perspiciatis dolore iure exercitationem obcaecati numquam atque
          molestias voluptatibus illo ratione consequuntur ab eligendi
          perferendis, mollitia dolores doloremque alias inventore laborum
          beatae. Eum saepe perferendis laborum dolore itaque molestias rerum
          vel illo praesentium, voluptatem quisquam debitis blanditiis voluptas.
          Quas vel quod quaerat placeat voluptatum, omnis quia aspernatur
          voluptate! Sint id quisquam consequatur, inventore neque sed, alias
          iste quo adipisci itaque laudantium error dolorum atque labore
          similique iusto placeat, eaque obcaecati commodi veniam vero. Beatae
          nulla aliquam, laudantium quaerat velit quo, quidem, voluptates non et
          facere illo voluptate itaque repudiandae optio asperiores. Nam
          expedita, laudantium iste enim fugiat tempora veniam similique
          dignissimos mollitia harum laboriosam quo. Atque amet nisi quas
          debitis illo consequuntur sapiente nam, odio mollitia, doloremque hic.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
          aliquam maiores placeat repudiandae labore ipsa obcaecati nemo.
          Laudantium magni dicta itaque debitis doloremque praesentium mollitia
          quos qui suscipit, molestias quasi. Quos veniam odit, consequuntur
          quibusdam sunt eos suscipit enim inventore neque.
        </div>
      </div>
    </>
  );
};

export default PostView;
