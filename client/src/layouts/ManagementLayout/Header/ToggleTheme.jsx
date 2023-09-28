import { MIconButton } from "src/components/@material-extend"
import Iconify from "src/components/Iconify"
import useSettings from "src/hooks/useSettings"

const ToggleTheme = () => {
    const { themeMode, onChangeMode } = useSettings()
    return themeMode === 'light' ? <MIconButton size="large" onClick={() => onChangeMode('dark')}>
        <Iconify icon="eva:moon-outline" />
    </MIconButton> : <MIconButton size="large" onClick={() => onChangeMode('light')}>
        <Iconify icon="eva:sun-outline" />
    </MIconButton>
}

export default ToggleTheme