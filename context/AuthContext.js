"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {

    const [user, setUser] = useState(null);
    const [wallet, setWallet] = useState({});
    const [totalReferrals, setTotalReferrals] =  useState();
    const [totalNetworkUsers,setTotalNetworkUsers] = useState();
    const [referralLevels, setReferralLevels] =useState([]);

    const [loading, setLoading] =
        useState(true);

    // fetch current user
    const fetchUser = async () => {
        try {

            const res =
                await fetch(
                    "/api/user/me"
                );
            const data = await res.json();
           // console.log("authconetx",data)
            setUser(data.user);
            setWallet(data.wallet);
            setTotalReferrals(data.totalReferrals);
            setReferralLevels(data.referralLevels);
            setTotalNetworkUsers(data.totalNetworkUsers)
        } catch (error) {

            setUser(null);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchUser();

    }, []);

    return (

        <AuthContext.Provider
            value={{
                wallet,
                setWallet,
                referralLevels,
                totalNetworkUsers,
                totalReferrals,
                user,
                setUser,
                loading,
                fetchUser,
            }}
        >

            {children}

        </AuthContext.Provider>

    );
};

export const useAuth = () => {

    return useContext(AuthContext);

};