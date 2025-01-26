import * as React from "react";
import { View, Image, Text } from "react-native";
import { IconContainer } from "./IconContainerProps";

interface TravelInputProps {
  icon: string;
  label: string;
}

export const TravelInput: React.FC<TravelInputProps> = ({ icon, label }) => (
  <View className="flex flex-col flex-1 pb-3">
    <View className="flex overflow-hidden gap-1 bg-white rounded-3xl min-h-[43px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <View className="flex flex-1 shrink gap-1 p-1 basis-0 size-full">
        <IconContainer>
          <Image
            source={{ uri: icon }}
            className="object-contain self-stretch my-auto w-6 aspect-square"
          />
        </IconContainer>
        <View className="flex-1 shrink gap-2.5 self-stretch h-full text-base tracking-wide leading-6 whitespace-nowrap text-zinc-700">
          <Text>{label}</Text>
        </View>
      </View>
    </View>
    <Image
      source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/cccb96acea6ded4e1449dacbecf5d98ed7a65430d4436af9f809fcd7caaae114?placeholderIfAbsent=true&apiKey=a927bc4ffaff481f9666bb9a47fbfddf" }}
      className="object-contain z-10 self-end -mt-8 w-5 aspect-[0.95]"
    />
  </View>
);