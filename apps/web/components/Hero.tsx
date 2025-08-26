"use client"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "./ui/button"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import { useRouter } from "next/navigation";


export default function Hero() {
    const router = useRouter();

    return <div className="flex justify-center">
        <div className="max-w-6xl">
            <h1 className="text-6xl p-2 text-center pb-4">
                Generate Images for yourself and your family
            </h1>
            <Carousel>
                <CarouselContent>
                    <CarouselItem className="basis-1/4">
                        <img className="w-max[400px]" src="https://i.pinimg.com/736x/6e/78/60/6e786032f98626554787f8e3b148c649.jpg" />
                    </CarouselItem>
                    <CarouselItem className="basis-1/4">
                        <img className="w-max[400px]" src="https://i.pinimg.com/736x/82/f8/7e/82f87e622b049ba625861fa7d2f9a9e2.jpg" />
                    </CarouselItem>
                    <CarouselItem className="basis-1/4">
                        <img className="w-max[400px]" src="https://i.pinimg.com/736x/6e/78/60/6e786032f98626554787f8e3b148c649.jpg" />
                    </CarouselItem>
                    <CarouselItem className="basis-1/4">
                        <img className="w-max[400px]" src="https://i.pinimg.com/736x/82/f8/7e/82f87e622b049ba625861fa7d2f9a9e2.jpg" />
                    </CarouselItem>
                    <CarouselItem className="basis-1/4">
                        <img className="w-max[400px]" src="https://i.pinimg.com/736x/6e/78/60/6e786032f98626554787f8e3b148c649.jpg" />
                    </CarouselItem>
                    <CarouselItem className="basis-1/4">
                        <img className="w-max[400px]" src="https://i.pinimg.com/736x/82/f8/7e/82f87e622b049ba625861fa7d2f9a9e2.jpg" />
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="flex justify-center">
                <SignedIn>
                    <Button onClick= {() =>{
                        router.push("/dashboard")
                    }} className="mt-4  px-16 py-5 cursor-pointer" size={"lg"} variant={"secondary"}>Dashboard</Button>
                </SignedIn>
                <SignedOut>
                    <SignInButton/>
                </SignedOut>
            </div>
        </div>
    </div>
}