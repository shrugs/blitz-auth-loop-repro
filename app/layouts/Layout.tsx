import { Head } from "blitz";
import { ReactNode } from "react";

type LayoutProps = {
  title?: string;
  children: ReactNode;
};

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "boop"}</title>
      </Head>

      {children}
    </>
  );
};

export default Layout;
