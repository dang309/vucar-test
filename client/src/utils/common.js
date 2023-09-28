const checkExpireJwtToken = (expireDate) => {
  if (Date.now() >= expireDate * 1000) {
    return false;
  }
  return true;
};

const getDirtyValues = (dirtyFields, allValues) => {
  const result = {};

  Object.keys(dirtyFields).forEach((key) => {
    result[key] = allValues[key];
  });

  return result;
};

const urlToFile = (url, fileName) =>
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    )
    .then((dataUrl) => {
      let arr = dataUrl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], fileName, { type: mime });
    });

export { checkExpireJwtToken, getDirtyValues, urlToFile };
