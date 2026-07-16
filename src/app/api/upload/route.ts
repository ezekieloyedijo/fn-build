import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { put } from "@vercel/blob";
import { authOptions } from "@/lib/auth";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];
const MAX_SIZE = 8 * 1024 * 1024; // 8MB

async function uploadToBlob(file: File, filename: string) {
  const blob = await put(`uploads/${filename}`, file, {
    access: "public",
    addRandomSuffix: false,
  });
  return blob.url;
}

async function uploadToLocalDisk(file: File, filename: string) {
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), buffer);
  return `/uploads/${filename}`;
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const files = formData.getAll("files").filter((f): f is File => f instanceof File);

  if (files.length === 0) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 });
  }

  const useBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
  const urls: string[] = [];

  for (const file of files) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: `Unsupported file type: ${file.type}` }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: `${file.name} exceeds the 8MB limit` }, { status: 400 });
    }

    const ext = path.extname(file.name) || ".jpg";
    const filename = `${crypto.randomUUID()}${ext}`;
    const url = useBlob ? await uploadToBlob(file, filename) : await uploadToLocalDisk(file, filename);
    urls.push(url);
  }

  return NextResponse.json({ urls }, { status: 201 });
}
