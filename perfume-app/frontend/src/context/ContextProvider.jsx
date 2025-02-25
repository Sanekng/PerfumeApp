import { SellerProvider } from "./SellerContext";


export const ContextProviders = ({ children }) => {
    return (
        <SellerProvider>
                    {children}
        </SellerProvider>
    );
};
