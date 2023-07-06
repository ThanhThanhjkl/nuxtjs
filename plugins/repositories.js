import repository from "@/repositories";

export default (ctx, inject) => {
  inject("repositories", repository(ctx.$api));
};