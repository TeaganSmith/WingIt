import * as React from "react";
import { View, Image } from "react-native";
import { IconContainerProps } from "../types";

export const IconContainer: React.FC<IconContainerProps> = ({ children }) => (
  <View className="flex flex-col justify-center items-center self-stretch my-auto w-12 min-h-[48px]">
    <View className="flex overflow-hidden gap-2.5 justify-center items-center w-full max-w-[40px] rounded-[100px]">
      <View className="flex gap-2.5 justify-center items-center self-stretch p-2 my-auto w-10">
        {children}
      </View>
    </View>
  </View>
);