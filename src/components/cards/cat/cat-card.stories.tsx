import { Meta, StoryObj } from '@storybook/react';
import CatCard from './cat-card';
import { catCardMockProps } from './cat-card.mocks';

// https://storybook.js.org/docs/api/arg-types - ArgTypes
export default {
  title: 'cards/CatCard',
  component: CatCard,
  argTypes: {},
} as Meta<typeof CatCard>;

// https://storybook.js.org/docs/writing-stories#using-args - Stories
type catCardStoryProps = StoryObj<typeof CatCard>;

export const CatCardStory: catCardStoryProps = {
  args: {
    ...catCardMockProps.base,
  },
};
