import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import { deleteHouse, getHouses, postHouse, updateHouse } from '../services/api'

const sortingFunctions = {
  price: (a, b) => {
    return a.price - b.price
  },
  size: (a, b) => {
    return a.size - b.size
  }
}

export const usePropertiesStore = defineStore({
  id: 'properties',
  state: () => ({
    properties: [],
    search: '',
    sortBy: 'price',
    propertyToDeleteId: null
  }),
  actions: {
    async fill() {
      const properties = await getHouses()
      this.properties = properties.sort(sortingFunctions[this.sortBy])
      return properties
    },
    async createHouse(house) {
      const savedHouse = await postHouse(house)
      return savedHouse
    },
    async updateHouse(house, id) {
      await updateHouse(house, id)
      // Refetch the properties to update the state.
      // It would be better to fetch only the property that we changed, but the API can't do that.
      await this.fill()
      return this.propertyDetails
    },
    async deleteHouse() {
      await deleteHouse(this.propertyToDeleteId)
      this.properties = this.properties.filter((property) => {
        return property.id !== this.propertyToDeleteId
      })
      this.propertyToDeleteId = null
    },
    updateSearch(input) {
      this.search = input
    },
    clearSearch() {
      this.search = ''
    },
    updateSortBy(sortOption) {
      this.sortBy = sortOption
      this.properties = this.properties.sort(sortingFunctions[sortOption])
    },
    displayDeleteWarning(id) {
      this.propertyToDeleteId = id
    },
    cancelDeleteHouse() {
      this.propertyToDeleteId = null
    }
  },
  getters: {
    propertyDetails() {
      const route = useRoute()
      // If the property from the detail page is already in the store, we don't need to fetch it.
      const property = this.properties.find((property) => property.id === parseInt(route.params.id))
      return property
    },
    // Method for searching properties.
    filteredProperties(state) {
      return state.properties.filter((property) => {
        const searchAttributes = ['street', 'city', 'zip']
        return searchAttributes.some((attribute) => {
          return property.location[attribute].toLowerCase().includes(state.search.toLowerCase())
        })
      })
    },
    // Method for searching properties. Counting results.
    resultCount() {
      return this.filteredProperties.length
    },
    // Method for searching properties. No results.
    noResults() {
      return this.resultCount === 0
    },
    displayResultCount() {
      return this.resultCount && this.search
    },
    displayDeleteModal() {
      return this.propertyToDeleteId !== null
    }
  }
})
