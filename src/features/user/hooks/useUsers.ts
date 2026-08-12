import { httpClient } from "@/shared/api/httpClient";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await httpClient.get<{ users: [] }>("/users");
      return data;
    },
  });
};
