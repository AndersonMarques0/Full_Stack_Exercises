import axios from "axios";
const backUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(backUrl)

const create = newObject => {
    return axios.post(backUrl, newObject)
}

const deleteUser = id => {
    return axios.delete(backUrl + `/${id}`)
}

export default {
    getAll,
    create,
    deleteUser
}
