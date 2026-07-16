import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional().or(z.literal("")),
  projectType: z.string().optional().or(z.literal("")),
  message: z.string().min(10, "Please tell us a bit more about your project"),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const projectSchema = z.object({
  title: z.string().min(2, "Title is required"),
  category: z.string().min(2, "Category is required"),
  location: z.string().min(2, "Location is required"),
  description: z.string().min(10, "Description is required"),
  story: z.string().optional().or(z.literal("")),
  challenges: z.string().optional().or(z.literal("")),
  solutions: z.string().optional().or(z.literal("")),
  results: z.string().optional().or(z.literal("")),
  clientName: z.string().optional().or(z.literal("")),
  clientCompany: z.string().optional().or(z.literal("")),
  status: z.enum(["ONGOING", "COMPLETED"]),
  completionDate: z.string().optional().or(z.literal("")),
  coverImage: z.string().min(1, "Cover image is required"),
  featured: z.boolean().optional(),
  images: z.array(z.string()).optional(),
});
export type ProjectInput = z.infer<typeof projectSchema>;

export const serviceSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(10, "Description is required"),
  image: z.string().min(1, "Image is required"),
  icon: z.string().min(1),
});
export type ServiceInput = z.infer<typeof serviceSchema>;

export const testimonialSchema = z.object({
  clientName: z.string().min(2, "Client name is required"),
  company: z.string().optional().or(z.literal("")),
  message: z.string().min(5, "Testimonial message is required"),
  image: z.string().optional().or(z.literal("")),
  rating: z.number().min(1).max(5),
});
export type TestimonialInput = z.infer<typeof testimonialSchema>;

export const galleryImageSchema = z.object({
  url: z.string().min(1, "Image is required"),
  caption: z.string().optional().or(z.literal("")),
  category: z.string().min(1, "Category is required"),
});
export type GalleryImageInput = z.infer<typeof galleryImageSchema>;

export const faqSchema = z.object({
  question: z.string().min(4, "Question is required"),
  answer: z.string().min(4, "Answer is required"),
});
export type FaqInput = z.infer<typeof faqSchema>;
