
import axios from 'axios'

const baseUrl=process.env.REACT_APP_BASE_URL

export async function getActivities(){
    try{
        const response = await  axios({
            url:baseUrl,
            method:'GET',
            headers:{
                Authorization:'Basic NzI6N1pNb21TK1BHd3J3ZnlOQWVxSStOYVVVZ1N1OUxWUi80VE5JaFpMV3d1az0=',
                Accept:'application/json'
            }
        })
        return response;
    }catch(e){
        console.log(e)
    }
}

export async function saveNewFormat(data){
    console.log(data)
    try{
        const response = await  axios({
            url:baseUrl + 'sessions',
            method:'POST',
            data:data
        })
        return response;
    }catch(e){
        console.log(e)
    }
}