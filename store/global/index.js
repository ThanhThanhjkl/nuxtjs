import { getField, updateField } from "vuex-map-fields";

const SET_API = "SET_API";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

export default {
    state: () => ({
        api: [],
        currentPage: 1,
        itemsPerPage: 10,
    }),

    getters: {
        getField,
        paginatedApi: state => {
            const startIndex = (state.currentPage - 1) * state.itemsPerPage;
            const endIndex = startIndex + state.itemsPerPage;
            return state.api.slice(startIndex, endIndex);
        },
        totalPages: state => {
            return Math.ceil(state.api.length / state.itemsPerPage);
        },
    },

    actions: {
        showApi({ commit }) {
            return this.$repositories.global.showApi().then((result) => {
                commit(SET_API, result);
            });
        },

        setCurrentPage({ commit }, payload) {
            commit(SET_CURRENT_PAGE, payload);
          },
      
    },

    mutations: {
        updateField,

        SET_API(state, payload) {
            state.api = payload;
        },

        SET_CURRENT_PAGE(state, page) {
            state.currentPage = page;
        },
    },
};
