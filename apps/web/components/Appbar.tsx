import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import { Button } from './ui/button'

export function Appbar() {
    return <div className='flex justify-between p-2'>
        <div className='text-xl'>
            PhotoAI
        </div>
        <div>
            <SignedOut>
                <Button variant={"ghost"}>
                    <SignInButton />
                </Button>
            </SignedOut>
            <SignedIn>
                <UserButton />

            </SignedIn>
        </div>
    </div>
}