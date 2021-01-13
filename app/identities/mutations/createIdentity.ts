import { Ctx } from "blitz";
import db, { Prisma } from "db";

type CreateIdentityInput = Pick<Prisma.IdentityCreateArgs, "data">;
export default async function createIdentity({ data }: CreateIdentityInput, ctx: Ctx) {
  ctx.session.authorize();

  const identity = await db.identity.create({ data });

  return identity;
}
