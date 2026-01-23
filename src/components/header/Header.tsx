import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../container/Container";
import Logo from "../Logo";
import LogoutBtn from "../buttons/LogoutBtn";

interface NavItem {
  name: string;
  slug: string;
  active: boolean;
}
interface RootState {
  auth: {
    status: boolean;
  };
}
function Header() {
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const navigate = useNavigate();
  const navItems: NavItem[] = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header>
      <Container>
        <nav className="flex">
          <div>
            <Logo width="50px" />
          </div>
          <ul className="flex items-center gap-4 ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button className="px-2 py-2 hover:bg-blue-800 hover:text-white rounded-lg duration-300 hover:px-4 hover:py-4" onClick={() => navigate(item.slug)}>
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus&&(
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
