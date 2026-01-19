import { jest } from '@jest/globals';

jest.mock('expo-router', () => {
    return {
        useRouter: () => ({
            push: jest.fn(),
            back: jest.fn(),
            replace: jest.fn(),
            canGoBack: jest.fn(),
            dismissAll: jest.fn()
        }),
        router: {
            navigate: jest.fn(),
            back: jest.fn(),
            push: jest.fn(),
            replace: jest.fn(),
            canGoBack: jest.fn(),
            dismissAll: jest.fn()
        },
    };
});

afterEach(() => {
    jest.clearAllMocks();
})