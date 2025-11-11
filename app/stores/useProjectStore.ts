import { defineStore } from "pinia";

export const useProjectStore = defineStore('project', {
    state: () => ({
        _project: null,
    }),

    getters: {
        getProject: (state) => state._project,
    },

    actions: {
        setProject(data: any) {
            this._project = data;
        },

        async fetchDefaultProject() {
            const {data, error} = await api.project.default.get();

            if(error) {
                return false;
            }

            this.setProject(data);
            return data;
        }
    },

})
