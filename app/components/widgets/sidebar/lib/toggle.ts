export function useToggle() {
    const open = ref(true)

    const toggleSidebar = () => {
        open.value = !open.value
    }
    
    return {
        open,
        toggleSidebar
    }
}