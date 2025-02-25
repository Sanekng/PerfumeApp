import React, { createContext, useState, useEffect, useContext } from "react";
import {
    getSellers,
    createSeller,
    updateSeller,
    deleteSeller,
    getSellerById,
} from "../services/sellerService.js";

const SellerContext = createContext(null);

export const SellerProvider = ({ children }) => {
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSellers = async () => {
            try {
                const data = await getSellers();
                setSellers(data || []);
            } catch (err) {
                setError(err.message || "Error fetching sellers");
                setSellers([]);
            } finally {
                setLoading(false);
            }
        };
        fetchSellers();
    }, []);

    const addSeller = async (sellerData) => {
        try {
            const newSeller = await createSeller(sellerData);
            setSellers((prev) => [...prev, newSeller]);
        } catch (err) {
            setError(err.message || "Error adding seller");
        }
    };

    const editSeller = async (id, updatedData) => {
        try {
            await updateSeller(id, updatedData);
            setSellers((prev) =>
                prev.map((seller) => (seller._id === id ? { ...seller, ...updatedData } : seller))
            );
        } catch (err) {
            setError(err.message || "Error editing seller");
        }
    };

    const removeSeller = async (id) => {
        try {
            await deleteSeller(id);
            setSellers((prev) => prev.filter((seller) => seller._id !== id));
        } catch (err) {
            setError(err.message || "Error deleting seller");
        }
    };

    const fetchSellerById = async (id) => {
        try {
            return await getSellerById(id);
        } catch (err) {
            setError(err.message || "Error fetching seller");
            return undefined;
        }
    };

    return (
        <SellerContext.Provider value={{ sellers, loading, error, addSeller, editSeller, removeSeller, fetchSellerById }}>
            {children}
        </SellerContext.Provider>
    );
};

// ✅ Custom Hook (Prevents `undefined` Context Errors)
export const useSellers = () => {
    const context = useContext(SellerContext);
    if (!context) {
        throw new Error("useSellers must be used within a SellerProvider");
    }
    return context;
};
