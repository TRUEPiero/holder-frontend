export function usePagination() {
    const limit = 10;
    
    const currentPage = ref();
    const pagination = ref({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        hasNextPage: true
    });

    return {
        limit,
        currentPage,
        pagination
    }
}