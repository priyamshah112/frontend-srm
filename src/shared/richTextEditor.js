import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

const RichTextEditor = (props) => {
  const [isUpload, setUpload] = useState(false);
  const [textContent, setContent] = useState("");

  const handleEditorChange = (content, editor) => {
    setContent(content);
    props.handleDescription(content);
  };
  return (
    <>
      {/* <div dangerouslySetInnerHTML={{ __html: textContent }} /> */}

      <Editor
        apiKey="yqzp8s3o1swniyhlgunkrtdujfe9jdii4p30czhpdex1ubaz"
        value={props.value}
        init={{
          zIndex: 0,
          height: 500,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "image",
            "searchreplace visualblocks code",
            "insertdatetime media table paste code wordcount",
          ],
          menubar: false,
          images_upload_url: "postAcceptor.php",
          toolbar:
            "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor removeformat | pagebreak | charmap emoticons | preview save print | insertfile image media template link anchor codesample | table | ltr rtl",
          images_upload_handler: async function (blobInfo, success, failure) {
            // console.log(blobInfo, blobInfo.blob());
            // // console.log(blobInfo.base64());
            // const response = await axios.post(
            //   `${BACKEND_API_URL}/feed-gallery`,
            //   {
            //     file: `data:image/png;base64,${blobInfo.base64()}`,
            //     type: "news",
            //   },
            //   {
            //     headers: {
            //       "Content-Type": "application/json",
            //       Authorization: `Bearer ${props.token}`,
            //     },
            //   }
            // );
            // console.log(response.data["file-name"]);
            const successURL = "data:image/png;base64," + blobInfo.base64();
            // const successURL = response.data["file-name"];
            // const successURL = response.data.file_name;
            // console.log(successURL);
            setTimeout(function () {
              setUpload(true);
              success(successURL);
            }, 3000);
          },
        }}
        onEditorChange={handleEditorChange}
      />
    </>
  );
};

export default RichTextEditor;
