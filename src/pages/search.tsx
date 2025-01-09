import { avatar } from '@/assets';
import { ButtonFollow } from '@/components/FollowButton';
import { LoadingSpiner } from '@/components/LoadingSpiner';
import { InputGroup } from '@/components/ui/input-group';
import { useSearch } from '@/hooks/useSearch';
import { Box, HStack, Image, Input, Text } from '@chakra-ui/react';
import { useDebounce } from '@uidotdev/usehooks';
import { useForm } from 'react-hook-form';
import { LuUser } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

export function SearchComponent({ userId }: { userId: number }) {
  const { register, watch } = useForm({ defaultValues: { search: '' } });
  const searchValue = watch('search');
  const debounceSearch = useDebounce(searchValue, 500);
  const navigate = useNavigate();
  const { users,isLoading, isError } = useSearch(debounceSearch);

  // const filteredUsers = fakeUsers.filter(
  //   (user) =>
  //     user.profile.fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
  //     user.username.toLowerCase().includes(searchValue.toLowerCase())
  // );

  
  if (isLoading) {
    return (
      <LoadingSpiner />
    );
  }

  if (isError) {
    return (
      <Box w="100%" h="600px" display="flex" justifyContent="center" alignItems="center">
        <Text color="red.500">Failed to load users. Please try again.</Text>
      </Box>
    );
  }


  return (
    <Box width="100%" paddingTop="20px">
      <Box width={'90%'} paddingTop="25px" marginLeft={'35px'}>
        <HStack gap="10" width="full">
          <InputGroup flex="1" startElement={<LuUser />}>
            <Input
              backgroundColor="#3F3F3F"
              borderRadius="20px"
              _placeholder={{ color: '#B2B2B2' }}
              color="white"
              border="none"
              placeholder="Search your friend"
              {...register('search')}
            />
          </InputGroup>
        </HStack>
        <Box
          display="flex"
          flexDirection="column"
          marginTop="20px"
          marginBottom="10px"
        >
          <Box
            display="flex"
            flexDirection="column"
            marginTop="20px"
            marginBottom="10px"
          >
            {!searchValue ? (
              <Box
                w="100%"
                h="600px"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Text as="h1">Find someone you love</Text>
              </Box>
            ) : users?.length === 0 ? (
              <Box
              
                w="100%"
                h="600px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                textAlign="center"
                gap="20px"
              >
                <Text as="h1" fontSize="20px">
                  No result for "{debounceSearch}"
                </Text>
                <Text color="#909090" textAlign="center" fontSize="14px">
                  Try searching for something else or check the spelling of what
                  you typed.
                </Text>
              </Box>
            ) : (
              users?.map((user) => (
                <Box
                key={user.userName}
                  display="flex"
                  marginBottom="10px"
                  justifyContent="space-between"
                >
                  <Box
                    display="flex"
                    // onClick={() => navigate(`/user-profile/${user.username}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Image
                      marginLeft="22px"
                      borderRadius="full"
                      boxSize="40px"
                      src={user?.Profile?.avatar || avatar}
                      alt="user-img"
                    />
                    <Box
                      marginLeft="16px"
                      marginTop="-3px"
                      display="flex"
                      flexDirection="column"
                    >
                      <Text fontSize="14px">{user.fullName}</Text>
                      <Text fontSize="13px" color="#909090">
                        @{user.userName}
                      </Text>
                      <Text fontWeight="normal" fontSize="13px">
                        {user?.Profile?.bio || "halllo world"}
                      </Text>
                    </Box>
                  </Box>
                  <ButtonFollow marginTop="17px" followingId={user.id} isFollowing={false} />
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
