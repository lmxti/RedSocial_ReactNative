import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { getProfile, followUser, unFollowUser } from "../services/user.service";
import { getPostsUser } from "../services/post.service";
import { logout } from "../services/auth.service";
import { startConversation } from "../services/conversation.service";
import { router } from "expo-router";

export const useProfile = (userId = null) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [profileData, setProfileData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  const isOwnProfile = !userId || userId === currentUser?.id;
  const targetUserId = userId || currentUser?.id;

  const fetchProfileData = useCallback(async () => {
    if (!targetUserId || !currentUser) return;
    try {
      if (!targetUserId) return;

      const [profileResponse, postsData] = await Promise.all([
        getProfile(targetUserId),
        getPostsUser(targetUserId),
      ]);

      setProfileData(profileResponse);

      // Verifica si postsData es un array, si no, asigna un array vacío
      const sortedPosts = Array.isArray(postsData)
        ? postsData.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        : [];
      //
      setPosts(sortedPosts);

      if (!isOwnProfile) {
        const isFollowingUser = profileResponse?.followers?.includes(
          currentUser.id
        );
        setIsFollowing(isFollowingUser);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }, [targetUserId, isOwnProfile, currentUser?.id]);

  useEffect(() => {
      fetchProfileData();
  }, [targetUserId, fetchProfileData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProfileData();
  }, [fetchProfileData]);

  const handleLogout = async () => {
    await logout();
    setProfileData(null);
    setPosts([]);
    setIsFollowing(false);
  };

  const toggleFollow = async () => {
    try {
      if (isFollowing) {
        const result = await unFollowUser(targetUserId);
        if (result.success) {
          setIsFollowing(false);
        } else {
          console.error("Error al dejar de seguir al usuario:", result.message);
        }
      } else {
        // Llamar a followUser cuando el usuario hace click en "Seguir"
        const result = await followUser(targetUserId);
        // Si la acción fue exitosa, actualizamos el estado
        if (result.success) {
          setIsFollowing(true);
        } else {
          // Si ocurrió un error, mostramos el mensaje
          console.error("Error al seguir al usuario:", result.message);
        }
      }
      await fetchProfileData();
    } catch (err) {
      console.error("[ERROR]: useProfile-> toggleFollow", err);
    }
  };

  const handleSendMessage = async () => {
    try {
      // console.log("HandleSendMessage HOOK", targetUserId);

      const { success, data, message, conversationId } =
        await startConversation(targetUserId);
      if (success) {
        router.push(`/messages/${conversationId}`);
      }
    } catch (error) {
      console.error("Error al iniciar conversación:", error.message);
    }
  };

  return {
    profileData,
    posts,
    refreshing,
    loading,
    onRefresh,
    handleLogout,
    isOwnProfile,
    fetchProfileData,
    isFollowing,
    toggleFollow,
    handleSendMessage,
  };
};
