import '../src/styles/index.scss'
import './storybook.scss'
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";


import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

library.add(fas)
addDecorator(
  withInfo({
    header: false,
    inline: true
  })
);

