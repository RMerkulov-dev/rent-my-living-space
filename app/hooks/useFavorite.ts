import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useMemo, useCallback } from "react";
import toast from "react-hot-toast";

import { SafeUser } from "@/app/types";
import useLoginModal from "@/app/hooks/useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [listingId, currentUser]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) {
        return loginModal.onOpen();
      }
      try {
        let request;
        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }
        await request();
        router.refresh();
        toast.success(
          !hasFavorited ? "Place added to favorites" : "Removed from favorites"
        );
      } catch (error) {
        toast.error("Something went wrong ");
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );
  return {
    hasFavorited,
    toggleFavorite,
  };
};
export default useFavorite;
