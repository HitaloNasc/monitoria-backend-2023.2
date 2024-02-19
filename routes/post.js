import { Router } from "express";
import { prisma } from "../prisma.js";
import _ from "lodash";

export const postRouter = Router();

postRouter.get("/", async (req, res) => {
  const posts = await prisma.post.findMany();

  res.send(posts);
});

postRouter.get("/:id", async (req, res) => {
  const id = _.get(req, "params.id");

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  res.send(post);
});

postRouter.post("/", async (req, res) => {
  const data = {
    description: _.get(req, "body.description"),
    filename: _.get(req, "body.filename"),
    authorId: _.get(req, "body.authorId"),
  };

  const created = await prisma.post.create({
    data,
  });

  res.send(created);
});
