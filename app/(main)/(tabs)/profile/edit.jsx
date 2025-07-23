import Screen from "../../../../components/Screen";
import EditProfileForm from "../../../../components/profile/EditProfileForm"
import { useProfile } from "../../../../hooks/useProfile";

export default function EditProfileModal() {
  const { profileData } = useProfile();
  if (!profileData) return null;

  return (
    <Screen>
      <EditProfileForm initialData={profileData}/>
    </Screen>
  )



}
