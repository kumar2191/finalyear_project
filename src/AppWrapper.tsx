import { MantineProvider } from '@mantine/core'
import theme from './config/Theme'

function AppWrapper({ children }: any) {
    return (
        <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
            {children}
        </MantineProvider>
    )
}
export default AppWrapper