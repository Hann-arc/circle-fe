import { Comment, Heart, Like } from '@/assets/index';
import { Avatar } from '@/components/ui/avatar';
import { useGetMe } from '@/features/auth/hooks/use-find-me';
import { useFindthreadMe } from '@/service/thread';
import { Box, Image, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useToggleLike } from '@/hooks/useLike';
import { useDeleteThread } from '@/hooks/threads/use-delete-thread';
import { useLikeStore } from '@/store/likesStore';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@/components/ui/menu';

export const MyProfileAllPost = () => {
  const { User } = useGetMe();
  const { localLikes } = useLikeStore();
  const { mutate: toggleLike } = useToggleLike();
  const { mutate: deleteThread } = useDeleteThread();
  const navigate = useNavigate();

  const userId = User?.id;
  const { data: threads } = useFindthreadMe(userId);
  useEffect(() => {
    if (!threads) {
      console.log('thread null');
    }
  }, [threads]);
  dayjs.extend(relativeTime);

  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Do you want to delete this thread?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteThread(Number(id));
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  };
  const handleClick = (id: number) => {
    navigate(`/detail-post-me/${id}`);
  };
  const isLiked = threads?.filter((thread) => {
    localLikes[thread.id] ?? false;
  });

  console.log(threads);

  return (
    <Box flexDirection="column">
      <Box display="flex" flexDirection="column">
        {threads && threads.length > 0 ? (
          threads.map((thread) => {
            const isLiked = localLikes[thread.id] ?? false;

            return (
              <Box
                key={thread.id}
                cursor="pointer"
                onClick={() => handleClick(thread.id)}
                paddingTop="18px"
                display="flex"
                borderBottom="1px solid #3F3F3F"
                paddingBottom="18px"
                backgroundColor="#1A1A1A"
              >
                <Avatar
                  marginLeft="22px"
                  src={thread.author?.Profile?.avatar || 'default.jpg'}
                  boxSize="40px"
                />
                <Box
                  paddingRight="20px"
                  marginLeft="20px"
                  gap="10px"
                  display="flex"
                  flexDirection="column"
                >
                  <Box gap="5px" display="flex">
                    <Text fontWeight="bold" fontSize="14px">
                      {thread.author?.fullName || 'Unknown User'}
                    </Text>
                    <Text color="#909090" fontSize="14px">
                      @{thread.author?.userName || 'unknown'}
                    </Text>
                    <Text color="#909090" fontSize="14px">
                      •
                    </Text>
                    <Text color="#909090" fontSize="14px">
                      {dayjs(thread.createdAt).fromNow()}
                    </Text>
                  </Box>
                  <Box flexDirection="column" display="flex">
                    <Text
                      fontSize="14px"
                      marginBottom="7px"
                      paddingRight="20px"
                    >
                      {thread.content}
                    </Text>
                    {thread.media && (
                      <Image
                        src={thread.media}
                        alt=""
                        borderRadius="8px"
                        objectFit="cover"
                        maxHeight="400px"
                        marginBottom="5px"
                      />
                    )}
                  </Box>
                  <Box display="flex">
                    <Box
                      marginTop="5px"
                      marginLeft="-5px"
                      fontSize="14px"
                      display="flex"
                    >
                      {isLiked ? (
                        <Image
                          src={Like}
                          w="27px"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(thread.id);
                          }}
                        />
                      ) : (
                        <Image
                          src={Heart}
                          w="27px"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(thread.id);
                          }}
                        />
                      )}
                      <Text marginLeft="6px" color="#909090">
                        {thread._count?.likes || 0}
                      </Text>
                      <Image marginLeft="25px" w="24px" src={Comment} />
                      <Text marginLeft="6px" color="#909090">
                        {thread._count?.replies || 0} Replies
                      </Text>
                    </Box>
                    <Box display="flex" color="#909090" marginLeft="20px">
                      <MenuRoot positioning={{ placement: 'right-start' }}>
                        <MenuTrigger
                          asChild
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <Text w={'24px'}>...</Text>
                        </MenuTrigger>
                        <MenuContent
                          color={'white'}
                          backgroundColor={'#262626'}
                        >
                          <MenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(thread.id);
                            }}
                            backgroundColor={'#262626'}
                            value="new-txt"
                            color={'white'}
                            cursor={'pointer'}
                          >
                            Delete
                          </MenuItem>
                          <MenuItem
                            backgroundColor={'#262626'}
                            value="new-txt"
                            color={'white'}
                            cursor={'pointer'}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            Update
                          </MenuItem>
                        </MenuContent>
                      </MenuRoot>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })
        ) : (
          <Box
            paddingTop="18px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="16px" fontWeight="bold">
              No threads yet
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};
