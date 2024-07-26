import '@mantine/core/styles.css'
import {
    MantineProvider
} from '@mantine/core';

import { TemplatePage } from './pages/templatePage/templatePage';

import './App.css'

export default function App() {
    return (
        <MantineProvider defaultColorScheme='dark'>
            <>
                <TemplatePage />
            </>
        </MantineProvider>
    );
}

