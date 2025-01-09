import { Box, Image, Text } from "@chakra-ui/react";
import { Fb, Git, Ig, Linkin } from "@/assets/index";


export function RightSideFooter() {
  
  return (
    <Box
      marginTop={"20px"}
      marginLeft={"31px"}
      marginRight={"31px"}
      borderRadius={"20px"}
      display={"flex"} 
      gap={"10px"}
      alignItems={"center"}
      backgroundColor={"#262626"}
    >
      <Text marginLeft={"22px"} marginTop={"10px"}
        marginBottom={"10px"}>
        Developed by{" "}
        <Text as="span" fontWeight={"bold"}>
          {" "}
          Hann
        </Text>
      </Text>
      <Box
        display={"flex"}
        gap={"10px"}
        marginTop={"10px"}
        marginBottom={"10px"}
        alignItems={"center"}
      >
        <Text color={"#B2B2B2"}>•</Text>
        <Image src={Git} />
        <Image src={Linkin} />
        <Image src={Fb} />
        <Image src={Ig} />
      </Box>
    </Box>
  );
}
