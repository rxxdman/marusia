import { useQuery } from "@tanstack/react-query";
import { logoutUser } from "../API/users";
import { queryClient } from "../API/queryClient";
import { useState } from "react";

export const useUser = () => {

    const [logout, setLogout] = useState(false)

    const logoutQuery = useQuery(
        {
            queryKey: ["logout"],
            queryFn: async () => {
                await logoutUser();
                queryClient.invalidateQueries({ queryKey: ["profile"] })
            },
            enabled: logout === true,
        },
        queryClient
    );
    
      const logoutClick = () => {
        setLogout(true);
      };

      return {logoutClick}
}