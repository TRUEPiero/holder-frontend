import { logout } from "../api/logout";

export async function unauthorize() {
    const res = await logout();
    if(res) return false;

    const userStore = useUserStore();

    userStore.unauthorize();

    return true;
}