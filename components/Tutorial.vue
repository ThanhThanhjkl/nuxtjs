<template>
  <div>
    <ul>
      <li v-for="item in paginatedApi" :key="item.id">
        <h5>
          {{ item.name }}
        </h5>
        <p>{{ item.alpha_two_code }}</p>
        <p>{{ item.country }}</p>
        <p>{{ item.domains }}</p>
      </li>
    </ul>
    <div>
      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters, mapActions } = createNamespacedHelpers("global");

export default {
  computed: {
    ...mapState(["currentPage"]),
    ...mapGetters(["paginatedApi", "totalPages"]),
  },
  methods: {
    ...mapActions(["showApi", "setCurrentPage"]),
    previousPage() {
      if (this.currentPage > 1) {
        this.setCurrentPage(this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.setCurrentPage(this.currentPage + 1);
        if (this.currentPage + 1 === this.totalPages) {
          this.loadMoreData(); // Trigger loading more data when reaching the last page
        }
      }
    },
    loadMoreData() {
      // Make an API request or fetch additional data
      // Update the state using the 'SET_API' mutation
      // Example: axios.get(`/api/api?page=${this.currentPage + 1}`).then(response => this.$store.commit('SET_API', response.data));
    },
  },
  created() {
    this.showApi(); // Trigger the action to fetch initial data when the component is created
  },
};
</script>