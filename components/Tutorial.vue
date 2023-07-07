<template>
  <div>
    <b-container>
      <ul ref="listContainer">
        <li v-for="item in paginatedApi" :key="item.id">
          <h5>
            {{ item.name }}
          </h5>
          <p>{{ item.alpha_two_code }}</p>
          <p>{{ item.country }}</p>
          <p>{{ item.domains }}</p>
          <b-embed
            v-for="link in item.web_pages"
            :key="link.id"
            type="iframe"
            aspect="16by9"
            :src="link"
            allowfullscreen
          ></b-embed>
        </li>
      </ul>
      <div>
        <button @click="previousPage" :disabled="currentPage === 1">
          Previous
        </button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          Next
        </button>
      </div>
    </b-container>
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
          this.loadMoreData();
        }
      }
    },
    loadMoreData() {},
  },
  created() {
    this.showApi();
  },
};
</script>