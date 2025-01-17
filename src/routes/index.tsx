import ProvateRoute from '@/features/auth/route/PrivateRoute';
import { createBrowserRouter } from 'react-router-dom';
import { ForgotPasswordRoute } from './forgot-password';
import { HomeRoute } from './home';
import { LoginRoute } from './login';
import { MyProfileRoute } from './my-profile';
import { RegisterRoute } from './register';
import { ResetPasswordRoute } from './reset-password';
import { SearchRoute } from './search';
import FollowsRoute from './follows';
import FollowingRoute from './following';
import FollowersRoute from './followers';
import AllPostRoute from './my-profile-all-post';
import MediaRoute from './media';
import DetailRout from './detail-post';
import { ProfileUserRoute } from './user-profile';
import UserProfileAllPostRoute from './profile-user-all-post-route';
import UserProfileMediaRoute from './user-profile-media-route';
import { DetailPostImgRoute } from './detail-post-img';
import UserFollowsRoute from './user-follows';
import UserFollowingRoute from './user-following';
import UserFollowersRoute from './user-followers';

const router = createBrowserRouter([
  {
    element: <ProvateRoute />,
    children: [
      {
        path: 'user-follows',
        element: <UserFollowsRoute />,
        children: [
          {
            index: true,
            element: <UserFollowingRoute />
          },
          {
            path: 'followers',
            element: <UserFollowersRoute />
          }
        ]
      },
      {
        path: '/follows',
        element: <FollowsRoute />,
        children: [
          {
            index: true,
            element: <FollowingRoute />,
          },
          {
            path: 'followers',
            element: <FollowersRoute />,
          },
        ],
      },
      {
        path: '/profile',
        element: <MyProfileRoute />,
        children: [
          {
            index: true,
            element: <AllPostRoute />,
          },
          {
            path: 'media',
            element: <MediaRoute />,
          },
        ],
      },  
      {
        path: '/:query',
        element: <ProfileUserRoute />,
        children:[
          {
            index: true,
            element: <UserProfileAllPostRoute />,
          },
          {
            path: 'media',
            element: <UserProfileMediaRoute />,
          },
        ]
      },
      {
        path: '/',
        element: <HomeRoute />,
      },
      {
        path: '/search/',
        element: <SearchRoute />,
      },
      {
        path: '/detail-post/:id',
        element: <DetailRout />,
      },
      {
        path: '/detail-post-me/:id',
        element: <DetailRout />,
      },
      {
        path: '/detail/photo/:id',
        element: <DetailPostImgRoute />,
      },
    ],
  },
  {
    path: '/sign-in',
    element: <LoginRoute />,
  },
  {
    path: '/sign-in',
    element: <LoginRoute />,
  },
  {
    path: '/sign-up',
    element: <RegisterRoute />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordRoute />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordRoute />,
  },
]);

export default router;
