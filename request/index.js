export const request=(params)=>{
    //定义公共url
    // https://api-hmugo-web.itheima.net/api/public/v1/categories
    const baseUrl="http://127.0.0.1//big_homework"
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            url:baseUrl+params.url,
            success:(result)=>{
                resolve(result);
            },
            fail:(err)=>{
                reject(err);
            }
        });
    })
}