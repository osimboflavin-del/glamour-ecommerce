import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const CATS = {
  Skincare: [
    "Radiant Glow Serum",
    "Aloe Soothing Cream",
    "Milk Cleansing Scrub",
    "Coffee Sea Salt Scrub",
  ],
  Haircare: [
    "Nourishing Hair Oil",
    "Kinky Braid Extension",
    "Nature Boost Treatment",
    "Silky Shine Spray",
  ],
  Fragrance: [
    "Michael Platinum EDP",
    "Honey Amber Oil",
    "Versace Inspired Mist",
    "Vanilla Bloom Perfume",
  ],
  "Bath & Body": [
    "Sedoso Shower Gel",
    "Vaseline Cocoa Lotion",
    "Nice & Lovely Body Lotion",
    "Valon Aloe Lotion",
  ],
  Cosmetics: [
    "Matte Colour Lipstick",
    "HUDA Lip Gloss Set",
    "Pro Concealer",
    "Fit Skin Foundation",
  ],
  Accessories: [
    "Pearl Drop Earrings",
    "Wide Tooth Comb",
    "Satin Hair Wrap",
    "Gold Hoop Earrings",
  ],
};
const COLORS = [
  "#C99383",
  "#5A1F52",
  "#E7B9AC",
  "#8A9B6E",
  "#B08968",
  "#D9A6A0",
];

async function main() {
  const passwordHash = await bcrypt.hash("admin@2026", 10);
  await prisma.user.upsert({
    where: { email: "glamour@cosmetics.com" },
    update: { passwordHash },
    create: {
      name: "Admin",
      email: "glamour@cosmetics.com",
      passwordHash,
      role: "admin",
    },
  });

  let i = 0;
  for (const [category, names] of Object.entries(CATS)) {
    for (const name of names) {
      i++;
      const price = Math.round((300 + Math.random() * 2200) / 10) * 10;
      await prisma.product.create({
        data: {
          name,
          category,
          price,
          oldPrice: i % 6 === 0 ? Math.round(price * 1.3) : null,
          stock: 10 + (i % 15),
          description: `${name} — a Glamour favourite in our ${category.toLowerCase()} range.`,
          color: COLORS[i % COLORS.length],
        },
      });
    }
  }
  console.log("Seed complete. Admin login: admin@glamour.com / admin123");
}

main().finally(() => prisma.$disconnect());
