import { Button, ButtonGroup } from "@chakra-ui/react";
import logout from "app/auth/mutations/logout";
import { useCurrentUser } from "app/hooks/useCurrentUser";
import Layout from "app/layouts/Layout";
import { BlitzPage, Link, useMutation } from "blitz";
import { Suspense } from "react";

const UserInfo = () => {
  const currentUser = useCurrentUser();
  const [logoutMutation] = useMutation(logout);

  if (currentUser) {
    return (
      <>
        <Button
          onClick={async () => {
            await logoutMutation();
          }}
        >
          Logout
        </Button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Link href="/signup">
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href="/login">
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    );
  }
};

const Home: BlitzPage<any> = ({ user }) => {
  return (
    <div>
      <main>
        <div className="logo">
          <img src="/logo.png" alt="blitz.js" />
        </div>
        <p>
          <strong>Congrats!</strong> Your app is ready, including user sign-up and log-in.
        </p>
        <div>
          <Suspense fallback="Loading...">
            <UserInfo />
          </Suspense>
        </div>
        <p>
          <strong>
            To add a new model to your app, <br />
            run the following in your terminal:
          </strong>
        </p>
        <pre>
          <code>blitz generate all project name:string</code>
        </pre>
        <pre>
          <code>blitz db migrate</code>
        </pre>
        <div>
          <p>
            Then <strong>restart the server</strong>
          </p>
          <pre>
            <code>Ctrl + c</code>
          </pre>
          <pre>
            <code>blitz start</code>
          </pre>
          <p>
            and go to{" "}
            <Link href="/projects">
              <a>/projects</a>
            </Link>
          </p>
        </div>
        <ButtonGroup mt={5}>
          <Button
            as="a"
            href="https://blitzjs.com/docs/getting-started?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </Button>
          <Button
            as="a"
            href="https://github.com/blitz-js/blitz"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github Repo
          </Button>
          <Button as="a" href="https://slack.blitzjs.com" target="_blank" rel="noopener noreferrer">
            Slack Community
          </Button>
        </ButtonGroup>
      </main>

      <footer>
        <a
          href="https://blitzjs.com?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Blitz.js
        </a>
      </footer>
    </div>
  );
};

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>;

export default Home;
