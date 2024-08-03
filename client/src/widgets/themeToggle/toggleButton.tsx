import cx from 'clsx';
import { Switch, Tooltip, useMantineColorScheme, useComputedColorScheme, Group } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import classes from './toggleButton.module.css';

// Utility function to capitalize the first letter
function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function ActionToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <Group justify="center">
      <Tooltip label={capitalizeFirstLetter(computedColorScheme)} refProp="rootRef">
        <Switch
          checked={computedColorScheme === 'dark'}
          onChange={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
          size="xl"
          color="dark.3"
          onLabel={<IconMoonStars className={cx(classes.icon, classes.dark)} stroke={1.5} />}
          offLabel={<IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />}
        >
        </Switch>
      </Tooltip>
    </Group>
  );
}