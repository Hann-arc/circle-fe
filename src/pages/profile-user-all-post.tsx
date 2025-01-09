// import { Comment, Heart } from '@/assets/index';
// import { Avatar } from '@/components/ui/avatar';
// import fakeUser from '@/datas/users.json';
// import { Box, Image, Text } from '@chakra-ui/react';
// import { useParams } from 'react-router';

// export const UserProfileAllPost = () => {
//   const { username } = useParams();

//   const user = fakeUser.find((user) => user.username === username);

//   return (
//     <Box flexDirection={'column'}>
//       <Box display={'flex'} flexDirection={'column'}>
//         <Box
//           paddingTop={'18px'}
//           display={'flex'}
//           borderBottom={'1px'}
//           paddingBottom={'18px'}
//           borderColor={'#3F3F3F'}
//           border={'1px solid #3F3F3F'}
//         >
//           <Avatar
//             marginLeft={'22px'}
//             src={user?.profile.profilePicture}
//             boxSize="40px"
//           />
//           <Box
//             paddingRight={'20px'}
//             marginLeft={'20px'}
//             gap={'10px'}
//             display={'flex'}
//             flexDirection={'column'}
//           >
//             <Box gap={'5px'} display={'flex'}>
//               <Text fontWeight={'bold'} fontSize={'14px'}>
//                 {user?.profile.fullName}
//               </Text>
//               <Text color={'#909090'} fontSize={'14px'}>
//                 @{user?.username}
//               </Text>
//               <Text color={'#909090'} fontSize={'14px'}>
//                 •
//               </Text>
//               <Text color={'#909090'} fontSize={'14px'}>
//                 1m
//               </Text>
//             </Box>
//             <Box alignItems={'center'} display={'flex'}>
//               <Text fontSize={'14px'} paddingRight={'20px'}>
//                 main
//               </Text>
//             </Box>
//             <Box
//               marginTop={'5px'}
//               marginLeft={'-5px'}
//               fontSize={'14px'}
//               display={'flex'}
//             >
//               <Image src={Heart} w={'27px'} />
//               <Text marginLeft={'6px'} color={'#909090'}>
//                 0
//               </Text>
//               <Image marginLeft={'25px'} w={'24px'} src={Comment} />
//               <Text marginLeft={'6px'} color={'#909090'}>
//                 0 Replies
//               </Text>
//             </Box>
//           </Box>
//         </Box>
//         <Box
//           paddingTop={'18px'}
//           display={'flex'}
//           borderBottom={'1px'}
//           paddingBottom={'18px'}
//           borderColor={'#3F3F3F'}
//           border={'1px solid #3F3F3F'}
//         >
//           <Avatar
//             marginLeft={'22px'}
//             src={user?.profile.profilePicture}
//             boxSize="40px"
//           />
//           <Box
//             paddingRight={'20px'}
//             marginLeft={'20px'}
//             gap={'10px'}
//             display={'flex'}
//             flexDirection={'column'}
//           >
//             <Box gap={'5px'} display={'flex'}>
//               <Text fontWeight={'bold'} fontSize={'14px'}>
//                 {user?.profile.fullName}
//               </Text>
//               <Text color={'#909090'} fontSize={'14px'}>
//                 @{user?.username}
//               </Text>
//               <Text color={'#909090'} fontSize={'14px'}>
//                 •
//               </Text>
//               <Text color={'#909090'} fontSize={'14px'}>
//                 1m
//               </Text>
//             </Box>
//             <Box alignItems={'center'} display={'flex'}>
//               <Text fontSize={'14px'} paddingRight={'20px'}>
//                 main
//               </Text>
//             </Box>
//             <Box
//               marginTop={'5px'}
//               marginLeft={'-5px'}
//               fontSize={'14px'}
//               display={'flex'}
//             >
//               <Image src={Heart} w={'27px'} />
//               <Text marginLeft={'6px'} color={'#909090'}>
//                 0
//               </Text>
//               <Image marginLeft={'25px'} w={'24px'} src={Comment} />
//               <Text marginLeft={'6px'} color={'#909090'}>
//                 0 Replies
//               </Text>
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };
