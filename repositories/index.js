import globalRepository from "@/repositories/global";

export default ($api) => ({
    global: globalRepository($api),
});
