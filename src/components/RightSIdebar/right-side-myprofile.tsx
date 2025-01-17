import { Cover } from '@/assets/index';
import { Avatar } from '@/components/ui/avatar';
import { useGetMe } from '@/features/auth/hooks/use-find-me';
import { useDialogStore } from '@/store/dialogStore';
import { Box, Button, defineStyle, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

export function RightSideMyProfile() {
  const { openDialog } = useDialogStore();
  const navigate = useNavigate();

  const { User } = useGetMe();

  const ringCss = defineStyle({
    outlineWidth: '5px',
    outlineColor: 'colorPalette.500',
    outlineStyle: 'solid',
  });

  const openDialogProfile = () => {
    navigate('/profile');
   ;
   setTimeout(() => {
    openDialog()
  }, 300);
  
  };

  const goToFollowing = () => {
    navigate('/follows');
  };
  const goToFollowers = () => {
    navigate('/follows/followers');
  };

  return (
    <Box
      marginLeft={'31px'}
      marginRight={'31px'}
      borderRadius={'20px'}
      display={'flex'}
      gap={'10px'}
      flexDirection={'column'}
      backgroundColor={'#262626'}
    >
      <Text
        marginLeft={'22px'}
        marginTop={'20px'}
        marginBottom={'5px'}
        fontSize={'17px'}
        fontWeight={'bold'}
      >
        My Profile
      </Text>
      <Image
        src={User?.Profile?.cover || Cover}
        borderRadius="15px"
        marginLeft={'22.5px'}
        height="110px"
        width={'391.5px'}
        objectFit="cover"
        alt="Cover Image"
      />
      <Box display={'flex'} justifyContent={'space-between'}>
        <Avatar
          borderRadius="full"
          css={ringCss}
          borderColor="#262626 !important"
          boxSize="80px"
          src={User?.Profile?.avatar || 'defaul.jpg'}
          marginTop={'-50px'}
          marginLeft={'40px'}
        />
        <Button
          onClick={openDialogProfile}
          color="white"
          borderRadius="20px"
          backgroundColor="transparent"
          marginRight="20px"
          border="2px solid"
          size="sm"
          padding="4px 15px"
          fontSize="sm"
        >
          Edit Profile
        </Button>
      </Box>
      <Text
        marginTop={'-10px'}
        marginLeft={'22px'}
        fontWeight={'bold'}
        fontSize={'17px'}
      >
        {User?.fullName}
      </Text>
      <Text marginLeft={'22px'} marginTop={'-5px'} color={'#909090'}>
        @{User?.userName}
      </Text>
      <Text marginLeft={'22px'} marginTop={'-5px'}>
        {User?.Profile?.bio || 'Add Bio'}
      </Text>
      <Box display={'flex'} marginBottom={'20px'}>
        <Text marginLeft={'22px'} marginTop={'-5px'}>
          {User?._count?.following}{' '}
          <Text
            onClick={goToFollowing}
            cursor={'pointer'}
            as="span"
            color={'#909090'}
          >
            {' '}
            Following{' '}
          </Text>
        </Text>
        <Text
          onClick={goToFollowers}
          marginLeft={'22px'}
          cursor={'pointer'}
          marginTop={'-5px'}
        >
          {User?._count?.followers}{' '}
          <Text as="span" color={'#909090'}>
            {' '}
            Followers{' '}
          </Text>
        </Text>
      </Box>
    </Box>
  );
}
