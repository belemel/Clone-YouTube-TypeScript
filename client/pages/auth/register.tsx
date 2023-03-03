import {
    Button,
    Container,
    Paper,
    PasswordInput,
    Stack,
    TextInput,
    Title,
  } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import Head from "next/head";
import { useMutation } from "react-query";
import { registerUser } from "../../api";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { showNotification, updateNotification } from "@mantine/notifications";


function RegisterPage() {
    const router = useRouter();

    const form = useForm({
        initialValues:{
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
        }
    })

    const mutation = useMutation<
       string, 
       AxiosError, 
       Parameters<typeof registerUser>["0"]
       >(registerUser, {
        onMutate: () => {
            showNotification({
                id: "register",
                title: "Creating account",
                message: "Please wait...",
                loading: true, 
            })
        },
        onSuccess: () => {
            updateNotification({
                id: "register",
                title: "Success",
                message: "Successfully created account",
                loading: true, 
            });
            router.push("/auth/login");
        },
        onError:() => {
             updateNotification({
                id: "register",
                title: "Error",
                message: "Could not create account",
                
             })
        }
       })

    return (
        <>
        <Head>
           <title>Register user</title>
        </Head>
           <Container>
            <Title>Register</Title>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}
            >
                <Stack>
                <TextInput 
                  label="Email"
                  placeholder="udahuhadsuh"
                  required 
                  {...form.getInputProps("email")}
                  />
                  <TextInput 
                  label="Username"
                  placeholder="ahahaha"
                  required 
                  {...form.getInputProps("username")}
                  />
                  <PasswordInput 
                  label="Parssword"
                  placeholder="*****"
                  required 
                  {...form.getInputProps("password")}
                  />
                   <PasswordInput 
                  label="Confirm password"
                  placeholder="Your strong password"
                  required 
                  {...form.getInputProps("confirmPassword")}
                  />
                 
                <Button type="submit">Register</Button>
                </Stack>
            </form>
            </Paper>
           </Container>
        </>
    )
     
  
}

export default RegisterPage; 
