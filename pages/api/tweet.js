import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(501).end();
  }

  const session = await getSession({ req });

  if (!session) return res.status(401).json({ message: "not logged in" });

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) return res.status(401).json({ message: "User not found" });

  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    try {
      await prisma.tweet.create({
        data: {
          content: data.content,
          author: {
            connect: { id: user.id },
          },
        },
      });
    } catch {
    } finally {
      res.end();
      return;
    }
  }
}
