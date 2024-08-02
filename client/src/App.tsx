import '@mantine/core/styles.css'
import {
    MantineProvider,
    Stack
} from '@mantine/core';

import { TemplatePage } from './pages/templatePage/templatePage';
import { HomePage } from './pages/homePage/homePage';

import './App.css'
import Header from './widgets/header/header';

export default function App() {
    return (
        <MantineProvider defaultColorScheme='dark'>
            <>
                <Stack
                    gap={0}
                    p="md"
                >
                    <Header />
                    <HomePage />
                </Stack>
            </>
        </MantineProvider>
    );
}

