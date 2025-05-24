import {definePreset, palette} from "@primeng/themes";
import Aura from "@primeng/themes/aura";

export const AuraNordDark = definePreset(Aura, {
    semantic: {
        primary: palette("#88C0D0"),
        colorScheme: {
            dark: {
                surface: palette("#2E3440")
            },
            light: {
                surface: palette("#ECEFF4")
            }
        }
    },
    components: {
        card: {
            borderRadius: "12px",
            padding: "1rem",
            background: "#4c566a",
            margin: 8
        }
    }
})