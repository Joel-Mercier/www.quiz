import { VStack } from "@/components/ui/vstack";
import { KeyboardAvoidingView } from "@/components/ui/keyboard-avoiding-view";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { AlertCircleIcon } from "@/components/ui/icon";
import { useSession } from "@/contexts/auth";
import { Link, useRouter } from "expo-router";
import { Heading } from "@/components/ui/heading";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { useHeaderHeight } from '@react-navigation/elements';
import { Center } from "@/components/ui/center";
import * as WebBrowser from 'expo-web-browser';
import { wwwJamApiInstance } from "@/services/api/www.quiz";
import * as SecureStore from "expo-secure-store";
import { LoginParams } from "@/services/api/www.quiz/auth";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const headerHeight = useHeaderHeight();
  const { signIn, setSession } = useSession();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginParams>({
    defaultValues: {
      email: "admin@wwwquiz.com",
      password: "abcd1234"
    }
  })

  const togglePassword = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }

  const onSubmit: SubmitHandler<LoginParams> = (data) => {
    signIn(data);
  }

  const handleProviderSignIn = async (provider: string) => {
    const result = await WebBrowser.openAuthSessionAsync(`${process.env.EXPO_PUBLIC_WWW_JAM_API_URL}/api/v1/auth/${provider}/redirect`, 'wwwquiz://(app)/(tabs)/');
    if (result.type === 'success') {
      const url = new URL(result.url);
      const token = url.searchParams.get('token') || undefined;
      wwwJamApiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setSession({
        token: token,
      });
      await SecureStore.setItemAsync('session', token);
      WebBrowser.dismissAuthSession();
      router.replace('/(app)/(tabs)/')
    } else {
      WebBrowser.dismissAuthSession();
    }
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Box className="px-4" style={{ paddingTop: headerHeight }}>
          <VStack>
            <Heading size="3xl" className="mb-4">Hello there !</Heading>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name='email'
              render={({ field: { onChange, onBlur, value } }) => (
                <FormControl
                  size="lg"
                  isDisabled={false}
                  isInvalid={!!errors.email}
                  isReadOnly={false}
                  isRequired={true}
                  className="mb-8"
                >
                  <FormControlLabel className="mb-1">
                    <FormControlLabelText>Email</FormControlLabelText>
                  </FormControlLabel>
                  <Input variant="underlined">
                    <InputField type="text" placeholder="Email" onChangeText={onChange} onBlur={onBlur} value={value} size="xl" className="text-xl"  />
                  </Input>
                  {errors.email &&
                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>
                        Error
                      </FormControlErrorText>
                    </FormControlError>
                  }
                </FormControl>
              )}
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name='password'
              render={({ field: { onChange, onBlur, value } }) => (
                <FormControl
                  size="lg"
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  isRequired={true}
                  className="mb-8"
                >
                  <FormControlLabel className="mb-1">
                    <FormControlLabelText>Password</FormControlLabelText>
                  </FormControlLabel>
                  <Input variant="underlined">
                    <InputField type={showPassword ? "text" : "password"} placeholder="Password" onChangeText={onChange} onBlur={onBlur} value={value} size="xl" className="text-xl"  />
                    <InputSlot onPress={togglePassword} className="pr-3">
                      <InputIcon
                        as={showPassword ? EyeIcon : EyeOffIcon}
                        className="text-primary-500"
                      />
                    </InputSlot>
                  </Input>
                  <FormControlHelper>
                    <FormControlHelperText>
                      Must be at least 6 characters.
                    </FormControlHelperText>
                  </FormControlHelper>
                  {errors.password &&
                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>
                        At least 6 characters are required.
                      </FormControlErrorText>
                    </FormControlError>
                  }
                </FormControl>
              )}
            />
            <Center>
              <Button
                size="lg"
                variant="outline"
                action="primary"
                isDisabled={false}
                isFocusVisible={false}
                onPress={() => handleProviderSignIn('google')}
              >
                
                <ButtonText>Sign in with Google</ButtonText>
              </Button>
              <Button
                size="lg"
                variant="outline"
                action="primary"
                isDisabled={false}
                isFocusVisible={false}
                onPress={() => handleProviderSignIn('facebook')}
              >
                
                <ButtonText>Sign in with Facebook</ButtonText>
              </Button>
              <Button
                size="lg"
                variant="outline"
                action="primary"
                isDisabled={false}
                isFocusVisible={false}
                onPress={() => handleProviderSignIn('discord')}
              >
                
                <ButtonText>Sign in with Discord</ButtonText>
              </Button>
              <Button
                size="lg"
                variant="outline"
                action="primary"
                isDisabled={false}
                isFocusVisible={false}
                onPress={() => handleProviderSignIn('github')}
              >
                <ButtonText>Sign in with Github</ButtonText>
              </Button>
            </Center>
            <Center className="mt-8">
              <Link href="/lost-password" asChild>
                <Button size="lg" action="primary" variant="link">
                  <ButtonText>Forgot password ?</ButtonText>
                </Button>
              </Link>
            </Center>
          </VStack>
        </Box>
        <Box className="absolute bottom-0 left-0 right-0 min-h-24 bg-background justify-center border-t-2 border-background-50 px-4">
          <Button
            size="xl"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            onPress={handleSubmit(onSubmit)}
          >
            <ButtonText>Sign in</ButtonText>
          </Button>
        </Box>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}