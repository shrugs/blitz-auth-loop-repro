import { Ctx, NotFoundError } from "blitz";
import db, { Prisma } from "db";

type GetIdentityInput = Pick<Prisma.FindUniqueIdentityArgs, "where">;

export default async function getIdentity({ where }: GetIdentityInput, ctx: Ctx) {
  ctx.session.authorize();

  const identity = await db.identity.findUnique({ where });

  if (!identity) throw new NotFoundError();

  return identity;
}
