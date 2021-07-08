const uploadImage = async (files: File[], fileUrls: string[]) => {
  // Loop through each image then upload
  let urls: string[] = [];

  for (let i = 0; i < files.length; i++) {
    if (!files[i]) {
      urls.push(fileUrls[i]);
    } else {
      let url = await getUrl(files[i]);
      urls.push(url);
    }
  }

  return urls;
};

const getUrl = async (file: File) => {
  const formdata = new FormData();
  formdata.append("file", file);
  formdata.append("upload_preset", "traceorigin");
  formdata.append("resource_type", "auto");

  const res = await fetch("https://api.cloudinary.com/v1_1/dafreak/upload", {
    method: "POST",
    body: formdata,
  });
  const { secure_url } = await res.json();
  return secure_url;
};

export default uploadImage;
