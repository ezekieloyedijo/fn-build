import { prisma } from "@/lib/prisma";
import { GalleryManager } from "@/components/admin/gallery-manager";

export default async function AdminGalleryPage() {
  const images = await prisma.galleryImage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <p className="mb-6 text-sm text-muted">Upload and organize construction gallery images.</p>
      <GalleryManager images={images} />
    </div>
  );
}
