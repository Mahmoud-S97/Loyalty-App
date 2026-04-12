import React from 'react';
import { render } from '@testing-library/react-native';
import NotificationCard from '../NotificationCard';
import { notificationData } from '@/dummy-data';

jest.mock('@/components/layout/screens/ContainerView');

const notificationItem = notificationData[0]; // Dummy-data

describe('<NotificationCard />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders NotificationCard correctly', () => {

    const { getByTestId } = render(<NotificationCard item={notificationItem} index={0} />);

    expect(getByTestId('NotificationCard:AnimatedView')).toBeTruthy();
  });

  it('renders icon on the NotificationCard correctly', () => {

    const { getByTestId } = render(<NotificationCard item={notificationItem} index={0} />);

    expect(getByTestId('NotificationCard:Image').props.source).toBe(notificationItem.icon);
  });
})