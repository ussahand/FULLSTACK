import { render, fireEvent, waitFor } from '@testing-library/react-native';

import RepositoryListContainer from '../../components/RepositoryListContainer'
import SingInFormikForm from '../../components/SingInFormikForm';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const { getAllByTestId } = render(<RepositoryListContainer {...{ repositories }} />)

      const repositoryItems = getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;
      // screen.debug('hhhhhhh000000000000')
      expect(firstRepositoryItem).toHaveTextContent(repositories[0].fullName)
      expect(firstRepositoryItem).toHaveTextContent(repositories[0].description)
      expect(firstRepositoryItem).toHaveTextContent(repositories[0].language)

      const kConvert = n =>
        n >= 1000 ? (Math.round(n / 100) / 10 + 'K') : n

      expect(firstRepositoryItem).toHaveTextContent(kConvert(repositories[0].forksCount))
      expect(firstRepositoryItem).toHaveTextContent(kConvert(repositories[0].stargazersCount))
      expect(firstRepositoryItem).toHaveTextContent(kConvert(repositories[0].ratingAverage))
      expect(firstRepositoryItem).toHaveTextContent(kConvert(repositories[0].reviewCount))
    });
  });
});

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      const { getByPlaceholderText, getByText } = render(<SingInFormikForm callBack={onSubmit} />);

      fireEvent.changeText(getByPlaceholderText('user name'), 'Maria');
      fireEvent.changeText(getByPlaceholderText('password'), '1q2w3e');
      fireEvent.press(getByText('Sign in'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        // onSubmit.mock.calls[0][0] contains the first argument of the first call
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'Maria',
          password: '1q2w3e',
        });

      });
    });
  });
})

const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
  {
    id: 'reduxjs.redux2',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
];

