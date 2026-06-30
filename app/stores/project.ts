import type { Project, ProjectState } from "~/components/entities/project/model/types";

export const useProjectStore = defineStore('project', {
    state: ():ProjectState =>  ({
        id: null,
        title: null
    }), 
    actions: {
        setProject(data: Project) {
            this.id = data.id,
            this.title = data.title
        }
    }
})