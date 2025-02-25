import { useState } from 'react';

const useDelete = (deleteFunction) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async (id, onSuccess, onError) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');
        if (!isConfirmed) return;

        setLoading(true);
        try {
            // Optimistically remove the item by calling onSuccess
            onSuccess(id);

            // Perform the actual delete operation
            const response = await deleteFunction(id);
            alert(response.message || 'Item deleted successfully!');
            setError(null);
            return true; // Indicate success
        } catch (err) {
            // Revert the optimistic update by calling onError
            onError(id);
            setError(err.message || 'Failed to delete item');
            return false; // Indicate failure
        } finally {
            setLoading(false);
        }
    };

    return { handleDelete, loading, error };
};

export default useDelete;