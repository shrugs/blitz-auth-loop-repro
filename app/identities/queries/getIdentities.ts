import { Ctx } from "blitz";
import db, { Prisma } from "db";

type GetIdentitiesInput = Pick<Prisma.FindManyIdentityArgs, "where" | "orderBy" | "skip" | "take">;

export default async function getIdentities(
  { where, orderBy, skip = 0, take }: GetIdentitiesInput,
  ctx: Ctx,
) {
  ctx.session.authorize();

  const identities = await db.identity.findMany({
    where,
    orderBy,
    take,
    skip,
  });

  const count = await db.identity.count();
  const hasMore = typeof take === "number" ? skip + take < count : false;
  const nextPage = hasMore ? { take, skip: skip + take! } : null;

  return {
    identities,
    nextPage,
    hasMore,
    count,
  };
}
