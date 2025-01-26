import * as React from "react";
import { View, Image, Text } from "react-native";
import { SearchInput } from "./components/SearchInput";
import { TravelInput } from "./components/TravelInput";

export const WingitSearch: React.FC = () => {
  const travelInputs = [
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1c98230f4487733e737f2e098720dda9c7e7b48092cafb27532e51215042b5a1?placeholderIfAbsent=true&apiKey=a927bc4ffaff481f9666bb9a47fbfddf", label: "Departure" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1c98230f4487733e737f2e098720dda9c7e7b48092cafb27532e51215042b5a1?placeholderIfAbsent=true&apiKey=a927bc4ffaff481f9666bb9a47fbfddf", label: "Arrival" }
  ];

  return (
    <View className="flex relative flex-col px-2.5 pt-36 w-full aspect-[0.46] pb-[470px]">
      <Image
        source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/67a7754864e027eb69d4bb6970d0204978c337f542b4fc27cf20d30762ce29c7?placeholderIfAbsent=true&apiKey=a927bc4ffaff481f9666bb9a47fbfddf" }}
        className="object-cover absolute inset-0 size-full"
      />
      <View className="flex relative items-start self-center max-w-full text-3xl tracking-tight text-white w-[151px]">
        <View className="self-end mt-8 mr-0">
          <Text>Wingit</Text>
        </View>
        <Image
          source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/2150ece941bc0abd659e52c515c4892032b84fe7a1e8e15ddd24c4740577c2e5?placeholderIfAbsent=true&apiKey=a927bc4ffaff481f9666bb9a47fbfddf" }}
          className="object-contain shrink-0 self-start aspect-[1.54] w-[88px]"
        />
      </View>
      
      <SearchInput
        icon="https://cdn.builder.io/api/v1/image/assets/TEMP/728315a4dee7886052f73849805a080167688f2df94a767b1b67861977e91d84?placeholderIfAbsent=true&apiKey=a927bc4ffaff481f9666bb9a47fbfddf"
        placeholder="Your Airport"
        rightIcon="https://cdn.builder.io/api/v1/image/assets/TEMP/8078b41ec0fe3376c595ddb828f65d73a14699d5cbf96954433302b524a7c6fc?placeholderIfAbsent=true&apiKey=a927bc4ffaff481f9666bb9a47fbfddf"
      />
      
      <View className="flex relative gap-6 mt-11 mb-0">
        {travelInputs.map((input, index) => (
          <TravelInput
            key={index}
            icon={input.icon}
            label={input.label}
          />
        ))}
      </View>
    </View>
  );
}