import { Meta, StoryObj } from '@storybook/react';
import BaseTemplate from './base-template';
import { baseTemplateMockProps } from './base-template.mocks';

// https://storybook.js.org/docs/api/arg-types - ArgTypes
export default {
  title: 'Templates/BaseTemplate',
  component: BaseTemplate,
  argTypes: {},
} as Meta<typeof BaseTemplate>;

// https://storybook.js.org/docs/writing-stories#using-args - Stories
type TemplateStoryProps = StoryObj<typeof BaseTemplate>;

export const BaseTemplateStory: TemplateStoryProps = {
  args: {
    ...baseTemplateMockProps.base,
  },
};
