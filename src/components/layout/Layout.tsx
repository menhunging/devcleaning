import Header from "./header/Header";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="site-wrapper">
      <Header />
      <main className="main">{children}</main>
    </div>
  );
};

export default Layout;
