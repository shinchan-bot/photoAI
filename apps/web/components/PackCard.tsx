
export interface TPack {
    name: string;
    imageUrl1: string;
    imageUrl2: string
    description: string;
}


export function PackCard(props: TPack) {
    return <div className="border rounded hover:border-red-300 hover:border-1 flex">
        <div className="flex">
            <img src={props.imageUrl1} />
            <img src={props.imageUrl2} />
        </div>
        <div>
            {props.name}
        </div>
        <div>

        </div>
    </div>
}