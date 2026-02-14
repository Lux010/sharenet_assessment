import axios from 'axios'

const API_URL = 'https://api.sharenet.co.za/api/v1/px2/spots'

export async function fetchSpotPrices() {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error('Error fetching spot prices:', error)
    return []
  }
}
