import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Nadilson",
      email: "nadilson.ads@gmail.com",
      avatarUrl: "https://avatars.githubusercontent.com/u/11899797?v=4",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: "Example Pool",
      code: "BOL12345",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-02T12:00:00.201Z",
      firstTeamCountryCode: "DE",
      secondTeamCountryCode: "BR",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-03T12:00:00.201Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "AR",

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });

  /* const participant = await prisma.participant.create({
    data: {
      poolID: pool.id,
      userId: user.id,
    },
  }); */
}

main()