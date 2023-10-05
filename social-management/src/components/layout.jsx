"use client";

import React from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FiHome, FiLogOut, FiUser, FiMenu } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

const LinkItems = [
  { name: "All Posts", icon: FiHome, path: "/" },
  { name: "Account", icon: FiUser, path: "/accounts" },

  //   { name: "Favourites", icon: FiStar },
  //   { name: "Settings", icon: FiSettings },
];

export default function Layout({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box>{children}</Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const navigate = useNavigate();

  const toast = useToast();

  const signOut = async (form) => {
    try {
      localStorage.removeItem("phoneNumber");
      navigate("/auth");
      toast({
        title: "Sign out successfully!",
        status: "success",
        position: "top-right",
        isClosable: true,
        duration: 1000,
      });
    } catch (error) {
      toast({
        title: "Error!",
        status: "error",
        position: "top-right",
        isClosable: true,
        duration: 1000,
      });
      console.log("error", error);
    }
  };

  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Social Management
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
      <NavItem icon={FiLogOut} onClick={signOut}>
        {"Sign Out"}
      </NavItem>
    </Box>
  );
};

const NavItem = ({ icon, children, path, ...rest }) => {
  const location = useLocation();
  return (
    <Box
      as="a"
      href={path ?? "#"}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={location.pathname === path ? "gray.300" : "none"}
        _hover={{
          bg: "gray.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Social Management
      </Text>
    </Flex>
  );
};
