import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,

} from "@/components/ui/card"   
import {Button } from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectValue, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {UploadModel} from "@/components/ui/upload";

export default function Train() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Create Project</CardTitle>
                    <CardDescription>
                        Deploy your new project in one-click.
                    </CardDescription>
                    <CardAction>
                        <Button variant="link">Sign Up</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Name of the Model"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Type</Label>
                                <Select>
                                    <SelectTrigger id="name">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="Brown">Man</SelectItem>
                                        <SelectItem value="Blue">Woman</SelectItem>
                                        <SelectItem value="Hazel">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Age</Label>
                                <Input
                                    id="name"
                                    placeholder="Age of the Model"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Ethinicity</Label>
                                <Select>
                                    <SelectTrigger className="w-full" id="name">
                                        <SelectValue placeholder="Select"/>
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="White">White</SelectItem>
                                        <SelectItem value="Black">Black</SelectItem>
                                        <SelectItem value="AsianAmerican">Asian American</SelectItem>
                                        <SelectItem value="EastAsian">EastAsian</SelectItem>
                                        <SelectItem value="SouthEastAsian">South East Asian</SelectItem>
                                        <SelectItem value="SouthAsian">South Asian</SelectItem>
                                        <SelectItem value="MiddleEastern">Middle Eastern</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Eye Color</Label>
                                <Select>
                                    <SelectTrigger className="w-full" id="name">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="Brown">Brown</SelectItem>
                                        <SelectItem value="Blue">Blue</SelectItem>
                                        <SelectItem value="Hazel">Hazel</SelectItem>
                                        <SelectItem value="Gray">Gray</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Bald</Label>
                                <Switch />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <UploadModel/>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                        Create Model
                    </Button>
                    <Button variant="outline" className="w-full">
                        Cancel
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}