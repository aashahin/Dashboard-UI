import { useContext } from "react";
import { ThemeContext } from "@/context/theme";
import { UilAdjustHalf, UilMoon } from "@iconscout/react-unicons";
import { useTheme as useNextTheme } from "next-themes";
import { changeTheme } from "@nextui-org/react";

export const ToggleTheme = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  const { setNextTheme } = useNextTheme();

  return (
    <div className="toggle-mood">
      {theme === "light" ? (
        <UilAdjustHalf
          onClick={() => {
            setTheme("dark");
            changeTheme("dark");
            localStorage.setItem("theme", "dark");
            document.documentElement.classList.add("dark");
            document.body.style.backgroundColor = "#1D1F21";
            document.body.style.color = "#fff";
          }}
          size="30"
          color="#CE5300"
        />
      ) : (
        <UilMoon
          onClick={() => {
            setTheme("light");
            changeTheme("light");
            localStorage.setItem("theme", "light");
            document.documentElement.classList.remove("dark");
            document.body.style.backgroundColor = "#fff";
            document.body.style.color = "#000";
          }}
          size="30"
          color="#CE5300"
        />
      )}
    </div>
  );
};
