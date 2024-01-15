import { MenuItem } from "~/app/_components/nav/menu-item";
import Link from "next/link";

const links = [
  "wallet",
  "balance",
  "scheduled",
  "transactions",
  "expenses",
  "savings",
  "loans",
  "wealth",
  "simulation",
  "taxes",
];

const NavBar = () => {
  return (
    <div className="sticky top-0 h-screen w-20 select-none border-r">
      <div className="flex w-full flex-row border-b py-4">
        <img className="m-auto h-10" src="icon.png" alt="icon" />
      </div>

      {links.map((link) => {
        return (
          <Link key={link} href={link}>
            <MenuItem link={link} />
          </Link>
        );
      })}
    </div>
  );
};

export default NavBar;
