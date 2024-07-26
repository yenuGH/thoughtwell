import '@mantine/core/styles.css'
import {
    MantineProvider
} from '@mantine/core';

import { TemplatePage } from './pages/templatePage/templatePage';
import { HomePage } from './pages/homePage/homePage';

import './App.css'

export default function App() {
    return (
        <MantineProvider defaultColorScheme='dark'>
            <>
                {/* <TemplatePage /> */}

                <HomePage />
            </>
        </MantineProvider>
    );
}

