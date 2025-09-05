import { PackCard, TPack } from "./PackCard";
import { BACKEND_URL } from "@/app/config";
import axios from "axios";

async function getPacks(): Promise<TPack[]>{
    const res = await axios.get(`${BACKEND_URL}/pack/bulk`)
    return res.data.packs ?? [];
}

export async function Packs() {
    const packs = await getPacks();
    return <div>
        {packs.map(p => <PackCard {...p} />)}
    </div>
}