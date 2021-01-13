import { Ctx } from "blitz";
import db, { Prisma } from "db";

type DeleteIdentityInput = Pick<Prisma.IdentityDeleteArgs, "where">;

export default async function deleteIdentity({ where }: DeleteIdentityInput, ctx: Ctx) {
  ctx.session.authorize();

  const identity = await db.identity.delete({ where });

  return identity;
}
