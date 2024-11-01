import { useColorScheme } from "react-native"

function useColors () {

    const isDark = useColorScheme() == "dark"

    const mainBlue = isDark ? "#283b8f" : "#9cadea"

    const lowBlue = isDark ? "hsla(208, 100%, 62%, 0.554)" : "#00bbffcb"

    const over = isDark ? "#313131c8" : "#ffffffff"

    const placeholder = isDark ? "#c6c6c6c8" : "#a3a3a3ff"

    const grayButton = isDark ? "#313131c8" : "#e6e6e6"

    const text = isDark ? "white" : "black"

    const antiText = !isDark ? "white" : "black"

    const subText = isDark ? "#ffffffe1" : "#000000e1"

    const label = isDark ? "#aaaaaa" : "#00000063"

    const bar = isDark ? "#ffffff15" : "#00000015"

    const background = isDark ? "#222222" : "#f0f0f0"

    return Colors = {
        mainBlue,
        lowBlue,
        placeholder,
        over,
        antiText,
        text,
        bar,
        grayButton,
        subText,
        label,
        background
      }
    }

export default useColors