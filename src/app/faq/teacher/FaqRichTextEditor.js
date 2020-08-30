import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const RichTextEditor = (props) => {
  const [textContent, setContent] = useState('');

  const handleEditorChange = (content, editor) => {
    setContent(content);
    props.handleDescription(content);
  };
  return (
    <>
      {/* <div dangerouslySetInnerHTML={{ __html: textContent }} /> */}

      <Editor
        apiKey='yqzp8s3o1swniyhlgunkrtdujfe9jdii4p30czhpdex1ubaz'
        initialValue=''
        init={{
          zIndex: 0,
          height: 300,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'image',
            'searchreplace visualblocks code',
            'insertdatetime media table paste code wordcount',
          ],
          menubar: false,
          images_upload_url: 'postAcceptor.php',
          toolbar:
            'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor removeformat | pagebreak | charmap emoticons | preview save print | insertfile image media template link anchor codesample | table | ltr rtl',
          images_upload_handler: function (blobInfo, success, failure) {
            // console.log(blobInfo, blobInfo.blob());
            // console.log(blobInfo.base64());
            const successURL = 'data:image/png;base64, ' + blobInfo.base64();
            setTimeout(function () {
              success(successURL);
            }, 3000);
          },
        }}
        value={textContent}
        onEditorChange={handleEditorChange}
      />
    </>
  );
};

export default RichTextEditor;
