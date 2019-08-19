import axios from 'axios'


function fetch(url,data){
    return new Promise((resolve,reject) => {
        axios.get(url,data).then(res => {
            let status = res.data.status
            if(status === 200){
                resolve(res)
            }
            //如果没有登录就购买，返回状态码为300 然后跳转到登录页
            //根据实际业务情况
            if(status === 300){
                href.location = 'login.html'
                resolve(res)
            }
            rejects(res)
        }).catch(error =>{
            reject(error)
        })
    })
}


//到处fetch
export default fetch

// axios.post(url.cartMremove, {
//     ids
// }).then(res => {

// }).catch(res =>{

// })