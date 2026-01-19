import { defineStore } from "pinia";
import { useProjectStore } from "~/stores";

type state = {
    _cashboxes: any,
    _currentCashbox: any
}

const getProjectId = () => {
    const projectStore = useProjectStore();

    const project = projectStore.getProject;

    return project.id;
}

export const useCashboxStore = defineStore('cahsbox', {
    state: ():state => ({
        _cashboxes: [],
        _currentCashbox: null
    }),

    getters: {
        getCashboxes: (state) => state._cashboxes,
        getCurrent: (state) => state._currentCashbox
    },

    actions: {
        async fetchCashboxes() {
            const projectId = getProjectId();

            const {data, error} = await api.project[projectId].cashbox.get();

            if(error) {

            }

            this._cashboxes = data.data;
        },

        async getCurrentCashbox(cashboxId: number) {
            const projectId = getProjectId();

            const {data: cahsbox, error} = await api.project[projectId].cashbox[cashboxId].get();

            if(error) {

            }

            this._currentCashbox = cahsbox.data[0];
        },

        async createCashbox(cashboxData: any) {
            const projectId = getProjectId();

            const {data, error} = await api.project[projectId].cashbox.post({
                ...cashboxData,
                project: projectId
            });

            if(error) {

            }

            this._cashboxes = [
                ...this._cashboxes,
                data.data
            ]
        },

        clearCurrentCashbox() {
            this._currentCashbox = null;
        }
    }
})
