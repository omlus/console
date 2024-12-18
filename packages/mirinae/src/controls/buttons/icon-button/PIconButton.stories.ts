import type { Meta, StoryObj } from '@storybook/vue';
import type { ComponentProps } from 'vue-component-type-helpers';

import PIconButton from '@/controls/buttons/icon-button/PIconButton.vue';
import { getIconButtonArgs, getIconButtonArgTypes, getIconButtonParameters } from '@/controls/buttons/icon-button/story-helper';
import { ICON_BUTTON_STYLE_TYPE } from '@/controls/buttons/icon-button/type';

type PIconButtonPropsAndCustomArgs = ComponentProps<typeof PIconButton>;

const meta : Meta<PIconButtonPropsAndCustomArgs> = {
    title: 'Controls/Buttons/Icon Button',
    component: PIconButton,
    argTypes: {
        ...getIconButtonArgTypes(),
    },
    parameters: {
        ...getIconButtonParameters(),
    },
    args: {
        ...getIconButtonArgs(),
    },
};

export default meta;
type Story = StoryObj<typeof PIconButton>;


const Template: Story = {
    render: (args, { argTypes }) => ({
        props: Object.keys(argTypes),
        components: { PIconButton },
        template: `
            <div style="display:flex; align-items:center; justify-content:center; height:150px;">
                <p-icon-button
                    :name="name"
                    :style-type="styleType"
                    :color="color"
                    :disabled="disabled"
                    :activated="activated"
                    :loading="loading"
                    :size="size"
                    :animation="animation"
                    :shape="shape"
                />
            </div>
        `,
    }),
};

export const Size: Story = {
    render: () => ({
        components: { PIconButton },
        template: `
            <div style="display:flex; align-items:center; justify-content:center;">
                <p-icon-button class="flex-shrink-0 mr-8" name="ic_refresh" size="sm" />
                <p-icon-button class="flex-shrink-0 mr-8" name="ic_refresh" />
                <p-icon-button class="flex-shrink-0 mr-8" name="ic_refresh" size="lg" />
            </div>
        `,
    }),
};

export const Shape: Story = {
    render: () => ({
        components: { PIconButton },
        template: `
            <table>
            <tr>
                <td>circle</td>
                <td><p-icon-button style-type="tertiary" style="margin: 0.5rem" name="ic_refresh" shape="circle" /></td>
            </tr>
            <tr>
                <td>square</td>
                <td><p-icon-button style-type="tertiary" style="margin: 0.5rem" name="ic_refresh" shape="square" /></td>
            </tr>
            </table>
        `,
    }),
};

export const Disabled: Story = {
    render: () => ({
        components: { PIconButton },
        template: `
            <table>
                <tr>
                    <td>tertiary</td>
                    <td><p-icon-button style-type="tertiary" style="margin: 0.5rem" name="ic_refresh" disabled /></td>
                </tr>
                <tr>
                    <td>transparent</td>
                    <td><p-icon-button style-type="transparent" style="margin: 0.5rem" name="ic_refresh" disabled /></td>
                </tr>
                <tr>
                    <td>negative-secondary</td>
                    <td><p-icon-button style-type="negative-secondary" style="margin: 0.5rem" name="ic_refresh" disabled /></td>
                </tr>
                <tr>
                    <td>negative-transparent</td>
                    <td><p-icon-button style-type="negative-transparent" style="margin: 0.5rem" name="ic_refresh" disabled /></td>
                </tr>
            </table>
        `,
    }),
};

export const Animation: Story = {
    render: () => ({
        components: { PIconButton },
        template: `
            <div style="text-align:center">
                <p-icon-button style-type="tertiary" animation="spin" style="margin: 0.5rem" name="ic_refresh" />
                <p-icon-button style-type="transparent" animation="spin" style="margin: 0.5rem" name="ic_refresh" />
            </div>
        `,
    }),
};

export const Activated: Story = {
    render: () => ({
        components: { PIconButton },
        template: `
            <div style="text-align:center">
                <p-icon-button style-type="transparent" style="margin: 0.5rem" name="ic_refresh" />
                <p-icon-button style-type="transparent" :activated="true" style="margin: 0.5rem" name="ic_refresh" />
            </div>
        `,
    }),
};

export const StyleTypes: Story = {
    render: () => ({
        components: { PIconButton },
        template: `
            <table style="border-collapse: separate; border-spacing: 16px;">
                <thead>
                    <tr>
                        <th colspan="2">style type / variations</th>
                        <th>default</th>
                        <th>disabled</th>
                        <th>loading</th>
                        <th>activated</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(styleType) in styleTypes">
                        <tr :key="styleType">
                            <th colspan="2">{{styleType}}</th>
                            <td><p-icon-button :style-type="styleType" name="ic_search" /></td>
                            <td><p-icon-button :style-type="styleType" name="ic_search" disabled /></td>
                            <td><p-icon-button :style-type="styleType" name="ic_search" loading /></td>
                            <td><p-icon-button :style-type="styleType" name="ic_search" activated /></td>
                        </tr>
                    </template>
                </tbody>
            </table>
        `,
        setup() {
            return {
                styleTypes: Object.values(ICON_BUTTON_STYLE_TYPE),
            };
        },
    }),
};

export const Playground: Story = {
    ...Template,
};
