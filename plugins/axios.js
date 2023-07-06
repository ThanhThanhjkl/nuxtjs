export default function ({ $axios, store, redirect, app }, inject) {
  const axiosConfig = {
    timeout: 60000,
    baseURL: process.env.apiUrl
  };

  const api = $axios.create(axiosConfig);

  api.onResponse((response) => {
    if (response.config.toasted) {
      const message =
        response.data.message ||
        response.config.message ||
        lang.messages.success;
      app.$toast.success(message);
    }

    if (!response.config.hideLoading && store._vm.$nuxt) {
      store._vm.$nuxt.$loading.finish();
    }

    const errors = response.data.errors;

    if (errors && errors.length > 0) {
      throw errors;
    } else if (response.config.redirectTo) {
      redirect(response.config.redirectTo);
    }

    if (response.status === 201) {
      return {
        status: 201,
        data: response.data,
      };
    }

    return response.data;
  });

  inject("api", api);
}
