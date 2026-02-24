import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../container/Container";
import Logo from "../Logo";
import LogoutBtn from "../buttons/LogoutBtn";
import CommonBtn from "../buttons/CommonBtn";
import {toggle} from "../../store/features/themeSlice"
import type { RootState } from "../../store/store";

interface NavItem {
  name: string;
  slug: string;
  active: boolean;
}

function Header() {
  const authStatus = useSelector((state: RootState) => state.auth.status);
const theme = useSelector((state: RootState) => state.theme.color)
  const navigate = useNavigate();
  const dispatch=useDispatch()
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
    <header className="border-2  border-gray-300 dark:border-slate-800 py-4 ">
      <Container>
        <nav className="flex justify-between items-center">
          <div className="flex justify-center items-center">
            <Logo width="50px" /> <h1 className="text-blue-600 font-bold text-xl dark:text-gray-200">Blog-app</h1>
          </div>
          <ul className="flex items-center gap-4 ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <CommonBtn  onClick={() => navigate(item.slug)}>
                    {item.name}
                  </CommonBtn>
                </li>
              ) : null
            )}
            {authStatus&&(
              <li>
                <LogoutBtn />
              </li>
            )} 
          <CommonBtn variant="secondary" className="rounded-4xl" onClick={()=>dispatch(toggle())}>
        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </CommonBtn>
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
