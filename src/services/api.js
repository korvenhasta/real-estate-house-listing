import axios from 'axios'

export const instance = axios.create({
  // Base URL can be changed in .env.
  // This way we can have a production and a development API.
  baseURL: import.meta.env.VITE_BASE_URL
})

export const getHouses = async () => {
  const response = await instance.get('/houses')
  console.log(JSON.stringify(response.data))
  return response.data
}

export const postHouse = async (house) => {
  const response = await instance.post('/houses', {
    ...house
  })
  return response.data
}

export const updateHouse = async (house, id) => {
  const response = await instance.patch(`/houses/${id}`, {
    ...house
  })
  return response.data
}

export const deleteHouse = async (id) => {
  const response = await instance.delete(`/houses/${id}`)
  return response.data
}

export const uploadImage = async (image, houseId) => {
  let data = new FormData()
  data.append('image', image, image.name)

  await instance.post(`/houses/${houseId}/upload`, data, {
    headers: {
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`
    }
  })
}
