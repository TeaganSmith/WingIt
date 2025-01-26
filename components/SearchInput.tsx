import * as React from "react";
import { View, Image, Text } from "react-native";
import { IconContainer } from "./IconContainerProps";
import { SearchInputProps } from "../types";

export const SearchInput: React.FC<SearchInputProps> = ({ icon, placeholder, rightIcon }) => (
  <View className="flex overflow-hidden relative gap-1 bg-white rounded-3xl min-h-[56px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
    <View className="flex flex-1 shrink gap-1 items-center p-1 basis-0 min-w-[240px] size-full">
      <IconContainer>
        <Image
          source={{ uri: icon }}
          className="object-contain self-stretch my-auto w-6 aspect-square"
        />
      </IconContainer>
      <View className="flex-1 shrink gap-2.5 self-stretch h-full text-base tracking-wide leading-6 min-w-[240px] text-zinc-700">
        <Text>{placeholder}</Text>
      </View>
      {rightIcon && (
        <IconContainer>
          <Image
            source={{ uri: rightIcon }}
            className="object-contain self-stretch my-auto w-6 aspect-square"
          />
        </IconContainer>
      )}
    </View>
  </View>
);