import fetchGet from 'js/fetchGet.js'
import fetch from 'js/fetch.js'
import url from 'js/api.js'


class Addres{
    static list(){
        return fetchGet(url.addressLists)
    }

    static add(data){
        return fetch(url.addressAdd, data)
    }

    static remove(id){
        return fetch(url.addressRemove, id)
    }

    static update(data){
        return fetch(url.addressUpdata, data)
    }

    static setDefault(id){
        return fetch(url.addressSetDefault, id)
    }
}

export default Addres