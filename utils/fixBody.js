export const fixBody=(body,keys)=>{
    for (const key in body) {
        if (!keys.includes(key)) {
          delete body[key];
        }
      }
      return body;
}