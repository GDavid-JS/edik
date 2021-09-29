export const request = (url, type = 'GET', body = '') => {
  const xhr = new XMLHttpRequest();
  
  return new Promise((resolve, reject) => {
    xhr.open(type, url);

    xhr.addEventListener('readystatechange', () =>  {
      if(xhr.readyState === 4 && xhr.status === 200) {
        resolve(xhr.response);
      } else if (xhr.status !== 200) {
        reject(xhr.status, xhr);
      }
    })

    xhr.send(body);
  })
}