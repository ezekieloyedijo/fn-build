import { PrismaClient, ProjectStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@fnbuild.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const adminName = process.env.ADMIN_NAME ?? "FNBUILD Admin";

  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: { name: adminName, email: adminEmail, passwordHash, role: "ADMIN" },
  });
  console.log(`Admin user ready: ${adminEmail}`);

  // Demo content tables are fully refreshed on every seed run so the sample
  // data always matches the latest copy/imagery. Users and Enquiries are untouched.
  await prisma.projectImage.deleteMany();
  await prisma.project.deleteMany();
  await prisma.service.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.galleryImage.deleteMany();
  await prisma.faq.deleteMany();

  await prisma.service.createMany({
    data: [
      {
        title: "Building Construction",
        slug: "building-construction",
        description:
          "From luxury duplexes in Lekki to multi-storey office complexes in Abuja, we deliver residential and commercial buildings across Nigeria with strong structural engineering, quality materials, and strict site supervision from foundation to roofing.",
        image: "https://images.unsplash.com/photo-1668609268461-4f6a15269ff1?q=80&w=1600",
        icon: "HardHat",
        order: 0,
      },
      {
        title: "Architectural Design",
        slug: "architectural-design",
        description:
          "Our in-house architects design modern Nigerian homes and commercial spaces — from contemporary bungalows and duplexes to office complexes and shopping plazas — balancing bold aesthetics with practical, buildable plans and approved drawings.",
        image: "https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?q=80&w=1600",
        icon: "Compass",
        order: 1,
      },
      {
        title: "Renovation & Remodeling",
        slug: "renovation-remodeling",
        description:
          "We upgrade tired homes and offices into modern, high-value properties — new finishes, improved layouts, and updated electrical and plumbing systems — with minimal disruption to your family or business.",
        image: "https://images.unsplash.com/photo-1678575326996-a1bf09b86158?q=80&w=1600",
        icon: "Hammer",
        order: 2,
      },
      {
        title: "Civil Engineering",
        slug: "civil-engineering",
        description:
          "Road construction, drainage systems, and bridge works engineered to withstand Nigeria's terrain and rainy season — covering site surveys, earthworks, structural analysis, and full compliance with government specifications.",
        image: "https://images.unsplash.com/photo-1719314073622-9399d167725b?q=80&w=1600",
        icon: "Ruler",
        order: 3,
      },
      {
        title: "Project Management",
        slug: "project-management",
        description:
          "End-to-end project oversight covering budgeting in Naira, scheduling, materials procurement, and quality control — so estate developers, corporate clients, and government agencies get regular progress reports and no surprises.",
        image: "https://images.unsplash.com/photo-1671472013800-face4b78b0e5?q=80&w=1600",
        icon: "ClipboardList",
        order: 4,
      },
      {
        title: "Interior Finishing",
        slug: "interior-finishing",
        description:
          "Premium interior finishing for luxury Nigerian homes and offices — tiling, POP ceilings, cabinetry, lighting, and décor — delivering the polished, move-in-ready feel our clients expect.",
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600",
        icon: "PaintRoller",
        order: 5,
      },
    ],
  });
  console.log("Seeded services");

  await prisma.faq.createMany({
    data: [
      {
        question: "What areas of Nigeria do you service?",
        answer:
          "FNBUILD & Construction handles projects across Lagos, Abuja, Port Harcourt, Ibadan, Abeokuta, Benin City, Enugu, Kano, Uyo, Calabar, and beyond. Wherever your site is located, our team can carry out a site assessment and mobilise.",
        order: 0,
      },
      {
        question: "How much does it cost to build a duplex in Lagos?",
        answer:
          "Cost depends on plot size, number of floors, and finishing specification, but as a general guide, a standard 4-bedroom duplex in Lagos typically ranges from ₦45 million to ₦120 million including finishing. We provide a free, itemised quotation in Naira after an initial site visit or a review of your building plan.",
        order: 1,
      },
      {
        question: "Do you provide free quotations?",
        answer:
          "Yes. Send us your building plan or project details through our contact form or WhatsApp, and our team will prepare a free, no-obligation quotation in Naira within 48 hours.",
        order: 2,
      },
      {
        question: "Are you registered and insured to build in Nigeria?",
        answer:
          "FNBUILD & Construction is registered with the Corporate Affairs Commission (CAC), and we are fully licensed and insured for residential, commercial, and civil engineering projects nationwide.",
        order: 3,
      },
      {
        question: "How long does a typical construction project take?",
        answer:
          "Timelines depend on scope: a standard duplex or bungalow usually takes 6-9 months, while larger commercial complexes and estate developments can take 12-24 months. We provide a realistic project schedule before work begins.",
        order: 4,
      },
      {
        question: "Can you handle both design and construction?",
        answer:
          "Absolutely. Our architects, structural engineers, and construction crews work together under one roof, so you get a seamless design-build experience without having to coordinate multiple contractors.",
        order: 5,
      },
      {
        question: "Do you build churches, schools, and hospitals as well?",
        answer:
          "Yes. Beyond homes and commercial buildings, we have delivered church auditoriums, school blocks, and healthcare facilities for religious organisations, private schools, and corporate clients across Nigeria.",
        order: 6,
      },
    ],
  });
  console.log("Seeded FAQs");

  await prisma.testimonial.createMany({
    data: [
      {
        clientName: "Adaeze Nwosu",
        company: "Homeowner, Lekki, Lagos",
        message:
          "FNBUILD delivered our 5-bedroom duplex in Lekki ahead of schedule and within our agreed budget. Their site supervisor kept us updated every week — we always knew exactly what was happening on site.",
        image: "https://images.unsplash.com/photo-1613730317928-246094cb6a82?q=80&w=400",
        rating: 5,
        order: 0,
      },
      {
        clientName: "Engr. Emeka Chukwu",
        company: "Chukwu Foods Ltd, Port Harcourt",
        message:
          "We hired FNBUILD to put up our new warehouse and office complex in Port Harcourt. Professional team, transparent costing in Naira, and zero safety incidents throughout the project. Highly recommended.",
        image: "https://images.unsplash.com/photo-1711464669343-2596d0f1b526?q=80&w=400",
        rating: 5,
        order: 1,
      },
      {
        clientName: "Pastor Blessing Etim",
        company: "Grace Assembly, Abuja",
        message:
          "From the architectural drawings to the final finishing, FNBUILD handled our church auditorium project with excellence. The building has become a landmark in our community. God bless FNBUILD.",
        image: "https://images.unsplash.com/photo-1542276677-0aab41a6190f?q=80&w=400",
        rating: 5,
        order: 2,
      },
      {
        clientName: "Alhaji Ibrahim Sule",
        company: "Sule Properties, Abuja",
        message:
          "I have used FNBUILD for three estate projects now. Their project management is solid — they keep to the timeline and the quality of finishing is always top notch. A construction company you can trust.",
        image: "https://images.unsplash.com/photo-1657356217673-4f7000f768b4?q=80&w=400",
        rating: 5,
        order: 3,
      },
    ],
  });
  console.log("Seeded testimonials");

  const projects: Array<{
    title: string;
    category: string;
    location: string;
    description: string;
    story: string;
    challenges: string;
    solutions: string;
    results: string;
    clientName: string;
    clientCompany: string;
    status: ProjectStatus;
    completionDate: Date | null;
    coverImage: string;
    featured: boolean;
    images: string[];
  }> = [
    {
      title: "Golden Palms Estate Duplexes",
      category: "Residential",
      location: "Lekki, Lagos State",
      description:
        "A gated estate of twelve 5-bedroom detached duplexes with modern Nigerian architecture, built for a private property developer in Lekki.",
      story:
        "Golden Palms Estate was commissioned by a Lagos-based developer looking to deliver premium family homes within a secure, gated community in Lekki. FNBUILD handled everything from land preparation to final handover across the twelve-unit estate.",
      challenges:
        "The waterlogged nature of the Lekki axis required extensive land reclamation and a robust drainage plan before foundation work could begin, and the rainy season threatened to delay the 14-month timeline.",
      solutions:
        "We deployed sandfilling and a engineered drainage network ahead of construction, and ran a shift-based work schedule during the dry months to stay on track despite weather disruptions.",
      results:
        "All twelve duplexes were delivered within budget at approximately ₦850 million total contract value, fully sold out before completion, with zero reported structural issues after handover.",
      clientName: "Mr. Tunde Bakare",
      clientCompany: "Bakare Properties Ltd",
      status: ProjectStatus.COMPLETED,
      completionDate: new Date("2025-11-20"),
      coverImage: "https://images.unsplash.com/photo-1719887805632-de5be825f72b?q=80&w=1600",
      featured: true,
      images: [
        "https://images.unsplash.com/photo-1719887805632-de5be825f72b?q=80&w=1600",
        "https://images.unsplash.com/photo-1678575326996-a1bf09b86158?q=80&w=1600",
        "https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?q=80&w=1600",
      ],
    },
    {
      title: "Grace Assembly Church Auditorium",
      category: "Institutional",
      location: "Gwarinpa, Abuja",
      description:
        "A 2,500-seater church auditorium and administrative block built for Grace Assembly in Abuja, featuring a wide-span roof with no interior columns.",
      story:
        "Grace Assembly needed a larger worship space to accommodate their growing congregation. FNBUILD designed and built a modern auditorium with an unobstructed sanctuary, alongside offices and children's church facilities.",
      challenges:
        "Achieving a column-free interior for a 2,500-seat auditorium required a long-span steel truss roofing system that had to be engineered and installed safely at height.",
      solutions:
        "We partnered with a specialist steel fabricator to pre-engineer the trusses off-site, then used a crane-assisted installation sequence that cut roofing time by several weeks.",
      results:
        "The auditorium was completed within a ₦620 million budget and now hosts weekly services for over 3,000 worshippers, with the building recognised as a landmark along the Gwarinpa expressway.",
      clientName: "Pastor Blessing Etim",
      clientCompany: "Grace Assembly, Abuja",
      status: ProjectStatus.COMPLETED,
      completionDate: new Date("2025-06-10"),
      coverImage: "https://images.unsplash.com/photo-1666209925785-d9facf88a438?q=80&w=1600",
      featured: true,
      images: [
        "https://images.unsplash.com/photo-1666209925785-d9facf88a438?q=80&w=1600",
        "https://images.unsplash.com/photo-1559823329-03cc29d8326d?q=80&w=1600",
      ],
    },
    {
      title: "Trinity Business Plaza",
      category: "Commercial",
      location: "Trans Amadi, Port Harcourt",
      description:
        "A four-storey mixed-use commercial plaza with retail shops on the ground floor and office suites above, currently under construction in Port Harcourt.",
      story:
        "Trinity Business Plaza is being developed to provide modern office and retail space for Port Harcourt's growing business district, replacing an older single-storey structure on the same plot.",
      challenges:
        "The site sits close to existing utility lines and neighbouring businesses, requiring careful phasing to avoid disrupting surrounding traffic and commerce during construction.",
      solutions:
        "Our project management team coordinated with utility providers and local authorities to reroute services safely, and construction is being phased to keep the access road usable throughout the build.",
      results:
        "Structural work is over 70% complete, with the plaza on track for handover, and pre-leasing enquiries already at 60% of available office suites ahead of completion.",
      clientName: "Engr. Emeka Chukwu",
      clientCompany: "Chukwu Foods Ltd",
      status: ProjectStatus.ONGOING,
      completionDate: null,
      coverImage: "https://images.unsplash.com/photo-1572816225927-d08fb138f2b2?q=80&w=1600",
      featured: true,
      images: [
        "https://images.unsplash.com/photo-1572816225927-d08fb138f2b2?q=80&w=1600",
        "https://images.unsplash.com/photo-1594538756542-8c88bda491c5?q=80&w=1600",
      ],
    },
    {
      title: "Oke-Ira Link Road & Drainage Project",
      category: "Civil Engineering",
      location: "Ikeja, Lagos State",
      description:
        "A 1.8km road rehabilitation and drainage construction project connecting Oke-Ira to the Ikeja industrial corridor, delivered for a corporate estate association.",
      story:
        "Years of flooding and poor road access were affecting businesses along the Oke-Ira corridor. FNBUILD was engaged to reconstruct the road and install a proper drainage network to resolve persistent flooding.",
      challenges:
        "Heavy rainfall during the construction window repeatedly threatened to erode fresh earthworks, and the road had to remain partially passable for businesses throughout the project.",
      solutions:
        "We worked in phased sections, completing and hardening drainage channels before moving to the next stretch, and scheduled asphalt works around the weather forecast to protect the new surface.",
      results:
        "The completed road and drainage network eliminated seasonal flooding along the corridor, delivered at a contract value of approximately ₦310 million, with the estate association reporting smoother logistics for member businesses.",
      clientName: "Oke-Ira Industrial Estate Association",
      clientCompany: "Oke-Ira Industrial Estate Association",
      status: ProjectStatus.COMPLETED,
      completionDate: new Date("2025-03-02"),
      coverImage: "https://images.unsplash.com/photo-1719314073622-9399d167725b?q=80&w=1600",
      featured: false,
      images: [
        "https://images.unsplash.com/photo-1719314073622-9399d167725b?q=80&w=1600",
        "https://images.unsplash.com/photo-1550969026-f069940eedae?q=80&w=1600",
        "https://images.unsplash.com/photo-1766330301961-6366c58297d0?q=80&w=1600",
      ],
    },
    {
      title: "Emerald Heights Shopping Complex",
      category: "Commercial",
      location: "Bodija, Ibadan",
      description:
        "A modern shopping complex with supermarket anchor space and boutique retail units, under construction for a private estate developer in Ibadan.",
      story:
        "Emerald Heights is designed to bring a modern retail experience to the growing Bodija area of Ibadan, combining a supermarket anchor with smaller boutique units and ample parking.",
      challenges:
        "The client required a fast-tracked construction schedule to open ahead of the festive shopping season, compressing an originally 14-month plan into 10 months.",
      solutions:
        "We increased manpower on-site, ran parallel work streams for structural and finishing trades, and prioritised long-lead material orders from week one to avoid delays.",
      results:
        "The project is currently at finishing stage and remains on track for a festive-season opening, with over half of retail units already under lease agreements.",
      clientName: "Mrs. Folasade Ogunleye",
      clientCompany: "Ogunleye Estates",
      status: ProjectStatus.ONGOING,
      completionDate: null,
      coverImage: "https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?q=80&w=1600",
      featured: false,
      images: [
        "https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?q=80&w=1600",
        "https://images.unsplash.com/photo-1648023200358-9dc050df521d?q=80&w=1600",
      ],
    },
    {
      title: "Zion International School Block",
      category: "Institutional",
      location: "Independence Layout, Enugu",
      description:
        "A two-storey classroom block and administrative wing built for a private school in Enugu, including a science laboratory and ICT room.",
      story:
        "Zion International School needed additional classroom capacity to accommodate rising enrollment. FNBUILD delivered a purpose-built block designed for Nigerian secondary school curricula, including dedicated science and ICT facilities.",
      challenges:
        "Construction had to work around the school's academic calendar, with noisy or disruptive works restricted to holiday periods to avoid affecting students.",
      solutions:
        "We front-loaded foundation and structural work during term breaks and scheduled quieter finishing trades for weekday afternoons after classes had ended.",
      results:
        "The new block was delivered within a ₦180 million budget in time for the new academic session, adding six classrooms, a science lab, and an ICT room to the school's campus.",
      clientName: "Mrs. Ngozi Umeh",
      clientCompany: "Zion International School",
      status: ProjectStatus.COMPLETED,
      completionDate: new Date("2025-08-25"),
      coverImage: "https://images.unsplash.com/photo-1648023200358-9dc050df521d?q=80&w=1600",
      featured: false,
      images: [
        "https://images.unsplash.com/photo-1648023200358-9dc050df521d?q=80&w=1600",
        "https://images.unsplash.com/photo-1572816225927-d08fb138f2b2?q=80&w=1600",
      ],
    },
  ];

  for (const [index, project] of projects.entries()) {
    const slug = project.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    await prisma.project.create({
      data: {
        title: project.title,
        slug,
        category: project.category,
        location: project.location,
        description: project.description,
        story: project.story,
        challenges: project.challenges,
        solutions: project.solutions,
        results: project.results,
        clientName: project.clientName,
        clientCompany: project.clientCompany,
        status: project.status,
        completionDate: project.completionDate,
        coverImage: project.coverImage,
        featured: project.featured,
        order: index,
        images: {
          create: project.images.map((url, order) => ({ url, order })),
        },
      },
    });
  }
  console.log(`Seeded ${projects.length} projects`);

  await prisma.galleryImage.createMany({
    data: [
      {
        url: "https://images.unsplash.com/photo-1719887805632-de5be825f72b?q=80&w=1600",
        caption: "Duplex estate development, Lekki, Lagos",
        category: "Residential",
        order: 0,
      },
      {
        url: "https://images.unsplash.com/photo-1678575326996-a1bf09b86158?q=80&w=1600",
        caption: "Completed duplex exterior finishing",
        category: "Residential",
        order: 1,
      },
      {
        url: "https://images.unsplash.com/photo-1572816225927-d08fb138f2b2?q=80&w=1600",
        caption: "Mixed-use commercial development, Port Harcourt",
        category: "Commercial",
        order: 2,
      },
      {
        url: "https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?q=80&w=1600",
        caption: "City skyline near an ongoing commercial build",
        category: "Commercial",
        order: 3,
      },
      {
        url: "https://images.unsplash.com/photo-1719314073622-9399d167725b?q=80&w=1600",
        caption: "Bridge and road infrastructure works",
        category: "Civil Engineering",
        order: 4,
      },
      {
        url: "https://images.unsplash.com/photo-1550969026-f069940eedae?q=80&w=1600",
        caption: "Bridge construction progress",
        category: "Civil Engineering",
        order: 5,
      },
      {
        url: "https://images.unsplash.com/photo-1766330301961-6366c58297d0?q=80&w=1600",
        caption: "Road rehabilitation works in progress",
        category: "Civil Engineering",
        order: 6,
      },
      {
        url: "https://images.unsplash.com/photo-1668609268461-4f6a15269ff1?q=80&w=1600",
        caption: "On-site construction team at work",
        category: "Site Progress",
        order: 7,
      },
      {
        url: "https://images.unsplash.com/photo-1671472013800-face4b78b0e5?q=80&w=1600",
        caption: "Site supervision and quality checks",
        category: "Site Progress",
        order: 8,
      },
      {
        url: "https://images.unsplash.com/photo-1729843823577-40db41a5e8c9?q=80&w=1600",
        caption: "Our team on-site, safety first",
        category: "Site Progress",
        order: 9,
      },
      {
        url: "https://images.unsplash.com/photo-1666209925785-d9facf88a438?q=80&w=1600",
        caption: "Grace Assembly church auditorium, Abuja",
        category: "Institutional",
        order: 10,
      },
      {
        url: "https://images.unsplash.com/photo-1648023200358-9dc050df521d?q=80&w=1600",
        caption: "School administrative block, Enugu",
        category: "Institutional",
        order: 11,
      },
      {
        url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600",
        caption: "Interior finishing detail",
        category: "Interior Finishing",
        order: 12,
      },
      {
        url: "https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?q=80&w=1600",
        caption: "Modern residential architecture",
        category: "Residential",
        order: 13,
      },
    ],
  });
  console.log("Seeded gallery images");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
