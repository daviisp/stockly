import { auth } from "@/services/auth";
import { ProfileForm } from "./_components/profile-form";

const ProfilePage = async () => {
  const session = await auth();

  if (!session?.user) {
    return;
  }

  return <ProfileForm user={session.user} />;
};

export default ProfilePage;
