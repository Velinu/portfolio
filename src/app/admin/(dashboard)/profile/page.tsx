import { prisma } from "@/lib/prisma";
import { ProfileForm } from "./ProfileForm";

export default async function ProfilePage() {
  const profile = await prisma.profile.findFirst();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ fontWeight: "bold", fontSize: 13, borderBottom: "1px solid var(--w2k-mid-dark)", paddingBottom: 4 }}>
        👤 Editar Perfil
      </div>
      <ProfileForm profile={profile} />
    </div>
  );
}
