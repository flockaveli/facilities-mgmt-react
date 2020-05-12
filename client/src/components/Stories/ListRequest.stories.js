
import React from 'react';
import { action } from '@storybook/addon-actions';

import ListRequest from '../ListRequest';

export default {
  component: ListRequest,
  title: 'ListRequest',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const listRequestData = {
  id: '1',
  title: 'Test ListRequest',
  status: 'ListRequest_INBOX',
  updatedAt: new Date(2018, 0, 1, 9, 0)
};

export const actionsData = {
  onArchiveRequest: action('onArchiveRequest')
};

export const Default = () => <ListRequest listRequest={{ ...listRequestData }} {...actionsData} />;

export const Archived = () => <ListRequest listRequest={{ ...listRequestData, status: 'REQUEST_ARCHIVED' }} {...actionsData} />;