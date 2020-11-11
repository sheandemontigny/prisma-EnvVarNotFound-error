import { PrismaClient } from "@prisma/client";

process.env.DEBUG = "*";

const prisma = new PrismaClient({ log: ["query", "info", "warn"] });

(async () => {
  const config = await prisma.recordConfig.create({ data: {} });
  const container = await prisma.container.create({ data: {} });
  await prisma.record.create({
    data: {
      container: { connect: { id: container.id } },
      config: { connect: { id: config.id } },
      location: {
        connectOrCreate: {
          create: {
            location: "some_location",
          },
          where: {
            location: "some_location",
          },
        },
      },
      type: {
        connectOrCreate: {
          create: {
            type: "a",
          },
          where: {
            type: "a",
          },
        },
      },
    },
  });

  await prisma.$disconnect();
})().catch(async (e) => {
  console.log(e);
  await prisma.$disconnect();
});
