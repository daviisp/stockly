import { auth } from "@/services/auth";
import { ProfileForm } from "./_components/profile-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stockly - Perfil",
};

const ProfilePage = async () => {
  const session = await auth();

  if (!session?.user) {
    return;
  }

  return <ProfileForm user={session.user} />;
};

export default ProfilePage;
