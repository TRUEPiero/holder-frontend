import { getMe } from "../api/getMe";

export async function authorize() {
    const userStore = useUserStore();

    const res = await getMe();
    if (!res) return false;

    userStore.authorize(res.data);

    return true;
}