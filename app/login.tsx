import { useSession } from "@/contexts/auth";
import { AlertCircleIcon, Box, Button, ButtonText, FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText, Input, InputField, InputIcon, InputSlot, KeyboardAvoidingView, LinkText, SearchIcon, Text, VStack } from "@gluestack-ui/themed";
import { Link, router } from "expo-router";

export default function LoginScreen() {
  const { signIn } = useSession();

  return (
    <KeyboardAvoidingView>
      <Box px="$4" alignItems="center" justifyContent="center" height="$full">
        <VStack w="$80">
          <FormControl
            size="lg"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            isRequired={true}
            mb="$4"
          >
            <FormControlLabel mb="$1">
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField type="text" defaultValue="hello@www.jam.com" placeholder="Email" />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                The email you provided doesn't seem correct.
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <FormControl
            size="lg"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            isRequired={true}
            mb="$8"
          >
            <FormControlLabel mb="$1">
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField type="password" defaultValue="12345" placeholder="Password" />
            </Input>
            <FormControlHelper>
              <FormControlHelperText>
                Must be at least 6 characters.
              </FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                At least 6 characters are required.
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <Button
            size="lg"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            mb="$8"
            onPress={() => {
              signIn();
              router.replace('/')
            }}
          >
            <ButtonText>Sign in</ButtonText>
          </Button>
          <Link href="/lost-password">
            <LinkText>Password forgotten ?</LinkText>
          </Link>
        </VStack>
      </Box>
    </KeyboardAvoidingView>
  )
}