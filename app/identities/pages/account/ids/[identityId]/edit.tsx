import IdentityForm from "app/identities/components/IdentityForm";
import updateIdentity from "app/identities/mutations/updateIdentity";
import getIdentity from "app/identities/queries/getIdentity";
import Layout from "app/layouts/Layout";
import { BlitzPage, Link, useMutation, useParam, useQuery, useRouter } from "blitz";
import { Suspense } from "react";

export const EditIdentity = () => {
  const router = useRouter();
  const identityId = useParam("identityId", "string");
  const [identity, { setQueryData }] = useQuery(getIdentity, { where: { id: identityId } });
  const [updateIdentityMutation] = useMutation(updateIdentity);

  return (
    <div>
      <h1>Edit Identity {identity.id}</h1>
      <pre>{JSON.stringify(identity)}</pre>

      <IdentityForm
        initialValues={identity}
        onSubmit={async () => {
          try {
            const updated = await updateIdentityMutation({
              where: { id: identity.id },
              data: {
                //
              },
            });
            await setQueryData(updated);
            alert("Success!" + JSON.stringify(updated));
            router.push(`/identities/${updated.id}`);
          } catch (error) {
            console.log(error);
            alert("Error editing identity " + JSON.stringify(error, null, 2));
          }
        }}
      />
    </div>
  );
};

const EditIdentityPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditIdentity />
      </Suspense>

      <p>
        <Link href="/identities">
          <a>Identities</a>
        </Link>
      </p>
    </div>
  );
};

EditIdentityPage.getLayout = (page) => <Layout title={"Edit Identity"}>{page}</Layout>;

export default EditIdentityPage;
