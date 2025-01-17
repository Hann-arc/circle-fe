import { Avatar } from '@/components/ui/avatar';
import { Box, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Comment, Heart, Like } from '../assets/index';
// import useLikeStore from '@/store/likesStore';
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@/components/ui/menu';
import { useGetThreads } from '@/hooks/threads/threads';
import { useDeleteThread } from '@/hooks/threads/use-delete-thread';
import { useToggleLike } from '@/hooks/useLike';
import { useLikeStore } from '@/store/likesStore';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Swal from 'sweetalert2';
import { LoadingSpiner } from './LoadingSpiner';
import { useGetMe } from '@/features/auth/hooks/use-find-me';
import { useGetDetailUser } from '@/service/user';
export const ListPost = () => {
  const { threads, isLoading, isError } = useGetThreads();
  const { User } = useGetMe();
  const navigate = useNavigate();
  const { localLikes } = useLikeStore();
  const { mutate: toggleLike } = useToggleLike();
  const { mutate: deleteThread } = useDeleteThread();

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
    navigate(`/detail-post/${id}`);
  };
  const handleDetailImg = (id: number) => {
    navigate(`/detail/photo/${id}`);
  };
  const handleDetailProfileUser = (query: string) => {
    navigate(`/${query}`);
  };

  dayjs.extend(relativeTime);

  if (isLoading)
    return (
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        height={'80vh'}
      >
        {' '}
        <LoadingSpiner />
      </Box>
    );
  if (isError) return <div>Error...</div>;

  return (
    <>
      {threads?.map((thread) => {
        const isLiked = localLikes[thread.id] ?? false;
        return (
          <Box
            key={thread.id}
            display={'flex'}
            marginTop={'15px'}
            borderBottom={'2px solid'}
            paddingBottom={'18px'}
            onClick={() => handleClick(thread.id)}
            borderColor={'#3F3F3F'}
            cursor={'pointer'}
          >
            <Avatar
              marginLeft={'22px'}
              src={thread.author.Profile?.avatar}
              boxSize="40px"
              onClick={(e) => {
                e.stopPropagation();
                handleDetailProfileUser(thread.author.userName as string);
              }}
            />
            <Box
              paddingRight={'20px'}
              marginLeft={'20px'}
              gap={'10px'}
              display={'flex'}
              flexDirection={'column'}
            >
              <Box gap={'5px'} display={'flex'}>
                <Text
                  fontWeight={'bold'}
                  fontSize={'14px'}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDetailProfileUser(thread.author.userName as string);
                  }}
                >
                  {thread.author.fullName}
                </Text>
                <Text
                  color={'#909090'}
                  fontSize={'14px'}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDetailProfileUser(thread.author.userName as string);
                  }}
                >
                  @{thread.author.userName}
                </Text>
                <Text color={'#909090'} fontSize={'14px'}>
                  •
                </Text>
                <Text color={'#909090'} fontSize={'14px'}>
                  {dayjs(thread.createdAt).fromNow()}
                </Text>
              </Box>
              <Box flexDirection={'column'} display={'flex'}>
                <Text
                  fontSize={'14px'}
                  marginBottom={'7px'}
                  paddingRight={'20px'}
                >
                  {thread.content}
                </Text>
                {thread.media && (
                  <Image
                    src={thread.media}
                    alt=""
                    borderRadius="8px"
                    objectFit="cover"
                    w={'80%'}
                    maxHeight="400px"
                    marginBottom="5px"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDetailImg(thread.id);
                    }}
                  />
                )}
              </Box>
              <Box display={'flex'}>
                <Box
                  marginTop={'5px'}
                  marginLeft={'-5px'}
                  fontSize={'14px'}
                  display={'flex'}
                >
                  {isLiked ? (
                    <Image
                      src={Like}
                      w={'27px'}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(thread.id);
                      }}
                    />
                  ) : (
                    <Image
                      src={Heart}
                      w={'27px'}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(thread.id);
                      }}
                    />
                  )}
                  <Text marginLeft={'6px'} color={'#909090'}>
                    {thread._count.likes}
                  </Text>
                  <Image marginLeft={'25px'} w={'24px'} src={Comment} />
                  <Text marginLeft={'6px'} color={'#909090'}>
                    {thread.replies.length} Replies
                  </Text>
                </Box>
                {User?.id === thread.authorId ? (
                  <Box display={'flex'} color={'#909090'} marginLeft={'20px'}>
                    <MenuRoot positioning={{ placement: 'right-start' }}>
                      <MenuTrigger
                        asChild
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Text w={'24px'}>...</Text>
                      </MenuTrigger>
                      <MenuContent color={'white'} backgroundColor={'#262626'}>
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
                ) : null}
              </Box>
            </Box>
          </Box>
        );
      })}
    </>
  );
};
