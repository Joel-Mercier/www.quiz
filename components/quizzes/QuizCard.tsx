import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image"
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Box } from "@/components/ui/box";
import { formatDistanceToNow } from "date-fns";

export default function QuizCard({ quiz, horizontal = false, isLast = false }) {
  return (
    <Link href={{ pathname: "/quizzes/[id]", params: { id: "1" } }} asChild>
      <TouchableOpacity>
      <Card className={`p-0 mb-0 rounded-xl overflow-hidden ${horizontal ? 'mr-4 max-w-60' : 'mr-0 mb-4'}`}>
        <Box className={`${horizontal ? 'flex-col' : 'flex-row'}`}>
          <Image
            source={{ uri: "https://picsum.photos/200/120" }}
            className={`${horizontal ? 'w-full h-[120px]' : 'w-[120px] h-full'}`}
            alt="quiz"
          />
          <VStack className={`p-4 border-2 border-b-4 border-background-50 ${horizontal ? 'border-b-4 border-t-0' : 'flex-1 border-l-0'}`}>
            <Heading className="mb-2" size="md" numberOfLines={horizontal ? 2 : 1}>This is a test quiz let's hope it works</Heading>
            {!horizontal &&
              <HStack className="items-center mb-2">
                <Text className="text-sm">{formatDistanceToNow(new Date())} ago</Text>
                <Text className="text-sm mx-2">•</Text>
                <Text className="text-sm">5.9K plays</Text>
              </HStack>
            }
            <HStack className="items-center">
              <Avatar size="sm" className="h-6 w-6">
                <AvatarFallbackText>Joel Mercier</AvatarFallbackText>
              </Avatar>
              <Text className="ml-2 text-sm font-semibold" numberOfLines={1}>Joel Mercier</Text>
            </HStack>
          </VStack>
        </Box>
      </Card>
      </TouchableOpacity>
    </Link>
  );
}