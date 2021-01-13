import { Ctx } from "blitz";
import db, { Prisma } from "db";

type UpdateIdentityInput = Pick<Prisma.IdentityUpdateArgs, "where" | "data">;

export default async function updateIdentity({ where, data }: UpdateIdentityInput, ctx: Ctx) {
  ctx.session.authorize();

  const identity = await db.identity.update({ where, data });

  return identity;
}
