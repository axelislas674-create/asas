// layout/BasicLayout.tsx
import Footer from "@/components/Footer.tsx";
import Navbar from "@/islands/Navbar.tsx";
import { define } from "@/utils.ts";
import { Partial } from "fresh/runtime";

export default define.layout(function BasicLayout({ Component, url }) {
  return (
    <div className="flex flex-col min-h-screen bg-Azul" f-client-nav>
      <Navbar url={url.pathname} />
      <main>
        <Partial name="body">
          <Component />
        </Partial>
      </main>
      <Footer />
    </div>
  );
});