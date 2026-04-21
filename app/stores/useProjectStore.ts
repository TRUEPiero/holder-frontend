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
        }
    },

})
