// import { VStack, extendTheme, useColorMode, Box, IconButton, Button, Icon } from "@chakra-ui/react";

// import { SunIcon, MoonIcon } from "@chakra-ui/icons";

// const config = {
//   initialColorMode: "light",
//   useSystemColorMode: false,
// };

// const theme = extendTheme({ config });

// export default theme;



// export function ToggleNightMode() {
//   const { colorMode, toggleColorMode } = useColorMode();

//   return (
//     <header>
//       <Button onClick={toggleColorMode}>
//         Toggle {colorMode === "light" ? "Dark" : "Light"}
//       </Button>
//     </header>
//   );

// }; 

// export function ThemeToggler() {
//   const { colorMode, toggleColorMode } = useColorMode();
//   return (
//     <Box textAlign="right" py={4} mr={12}>
      
//       <IconButton
//         icon={colorMode === 'light' ? 'moon' : 'sun'}
//         onClick={toggleColorMode}
//         variant="ghost"
//       />
//     </Box> 
//   );
// }

// export function ThemeToggler2() {
//   // const { colorMode, toggleColorMode } = useColorMode();
//   return (
//     <VStack p={4}>
//       <IconButton
//         icon={<SunIcon/>}
//         isRound='true'
//         size='lg'
//         alignSelf='flex-end'
//         // onClick={toggleColorMode}
//         variant="ghost"
//       />
//       </VStack>
//   );
// }


import { ThemeProvider,theme, ColorModeProvider, CSSReset, Box, Flex, IconButton, useColorMode } from "@chakra-ui/react";

export const ChakraInitialize = ({children}) => {
  return(
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset/>
      </ColorModeProvider>
    </ThemeProvider>
  )
}

const ThemeSelector = () => {
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <Box>
      <IconButton icon={colorMode === 'light' ? 'moon' : 'sun'} onClick={toggleColorMode} />
    </Box>
  )
}