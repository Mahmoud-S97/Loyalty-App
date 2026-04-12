import React from 'react';
import { render } from '@testing-library/react-native';
import NotificationList from '../NotificationList';
import { notificationData } from '@/dummy-data';

jest.mock('../NotificationCard');

describe('<NotificationList />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders NotificationList correctly', () => {

    const { getByTestId } = render(<NotificationList notificationData={notificationData} />);

    expect(getByTestId('NotificationList:FlatList')).toBeTruthy();
  });

  it('renders Notification-Items from notificationData correctly', () => {

    const notificationItem = notificationData.slice(0, 1);

    const { getByTestId, getByText } = render(<NotificationList notificationData={notificationItem} />);

    expect(getByTestId('NotificationList:NotificationCard-1')).toBeTruthy();
    expect(getByText('BESTIE Team')).toBeTruthy();
  });

  it('renders empty state when notificationData is empty', () => {

    const {getByText} = render(<NotificationList notificationData={[]} />);
    expect(getByText('No notification items found')).toBeTruthy();
  });
})