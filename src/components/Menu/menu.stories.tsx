import Menu from './menu';
import Button from "../Button/button";
import {action} from "@storybook/addon-actions";
import React from "react";

export default {
  title: 'Menu'
}


export const Default = ()=> (
    <Button
        onClick={action('clicked')}
    >
      😀 😎 👍 💯
    </Button>
)


