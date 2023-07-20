import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export function connectDB() {
  prisma
    .$connect()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((reason: any) => {
    console.log("Database connect error:", reason);
  });
}